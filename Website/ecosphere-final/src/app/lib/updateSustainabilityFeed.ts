import cron from 'node-cron'
import axios from 'axios'
import { prisma } from './prisma'

const NEWS_API_KEY = process.env.NEWS_API_KEY

async function fetchNewsArticles() {
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=sustainability OR "climate change" OR "eco-innovation"&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
  )

  return response.data.articles.map((article: any) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    imageUrl: article.urlToImage,
    publishedAt: new Date(article.publishedAt),
    source: article.source.name,
    category: categorizeArticle(article.title + ' ' + article.description),
  }))
}

function categorizeArticle(content: string) {
  const categories = [
    'Climate Change',
    'Renewable Energy',
    'Sustainable Living',
    'Conservation',
    'Green Technology',
  ]

  // Simple categorization based on keyword matching
  for (const category of categories) {
    if (content.toLowerCase().includes(category.toLowerCase())) {
      return category
    }
  }

  return 'General Sustainability'
}

function generateTip(articles: any[]) {
  const tips = [
    {
      category: 'Energy Saving',
      content: 'Switch to LED bulbs to reduce your energy consumption and save on electricity bills.',
    },
    {
      category: 'Water Conservation',
      content: 'Install a low-flow showerhead to save water without compromising your shower experience.',
    },
    {
      category: 'Sustainable Transportation',
      content: 'Consider carpooling or using public transportation to reduce your carbon footprint.',
    },
    {
      category: 'Waste Reduction',
      content: 'Start composting your food scraps to reduce waste and create nutrient-rich soil for your garden.',
    },
    {
      category: 'Eco-friendly Shopping',
      content: 'Bring reusable bags when shopping to reduce plastic waste and support sustainable practices.',
    },
  ]

  // Select a random tip
  return tips[Math.floor(Math.random() * tips.length)]
}

async function updateSustainabilityFeed() {
  try {
    const newsArticles = await fetchNewsArticles()
    const tip = generateTip(newsArticles)

    await prisma.newsArticle.createMany({ data: newsArticles })
    await prisma.tip.create({ data: tip })

    console.log('Sustainability feed updated successfully')
  } catch (error) {
    console.error('Error updating sustainability feed:', error)
  }
}

export function startUpdateJob() {
  // Run the job every 6 hours
  cron.schedule('0 */6 * * *', updateSustainabilityFeed)
}