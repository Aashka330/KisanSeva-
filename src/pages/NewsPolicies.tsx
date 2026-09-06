import { useState } from 'react';
import { Calendar, ArrowRight, ExternalLink, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import NewsArticleCard from '../components/news/NewsArticleCard';
import { newsArticles, featuredArticle } from '../data/news';

const filters = ['All', 'Government', 'Market', 'Farming', 'Policy', 'Weather', 'Export/Import'];
const categories = ['Government Schemes', 'Agricultural Policies', 'Subsidies', 'Crop Insurance', 'Farming Regulations', 'Market Regulations', 'Export/Import Changes', 'Weather Alerts'];

export default function NewsPolicies() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? newsArticles
    : newsArticles.filter(a => a.filter === filter || a.category.includes(filter));

  return (
    <Layout>
      <div className="bg-beige min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Agri News & Policies' }]} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-deep-green font-heading">Agri News & Policies</h1>
              <p className="mt-2 text-muted">Real updates on government schemes, market news, weather alerts, and farming policies.</p>
            </div>
          </div>

          {/* Featured article with image */}
          <a
            href={featuredArticle.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-8 group"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card h-[320px] sm:h-[400px]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green via-deep-green/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <span className="inline-block px-3 py-1 bg-warm-yellow text-deep-green text-xs font-bold rounded-full mb-3">
                  Major Update
                </span>
                <h2 className="text-xl sm:text-3xl font-bold font-heading leading-tight max-w-3xl">
                  {featuredArticle.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-leaf-pale/90 max-w-2xl line-clamp-2 hidden sm:block">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 mt-4 text-sm text-leaf-pale/80">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {featuredArticle.date}
                  </span>
                  <span>{featuredArticle.category}</span>
                  <span className="flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" /> {featuredArticle.source}
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-warm-yellow group-hover:gap-2 transition-all">
                  Read Full Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </a>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(c => (
              <span key={c} className="px-3 py-1.5 bg-surface rounded-full text-xs font-medium text-muted border border-border">
                {c}
              </span>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-muted shrink-0" />
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter === f ? 'bg-deep-green text-white' : 'bg-surface border border-border text-muted hover:border-leaf'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(article => (
              <NewsArticleCard key={article.id} article={article} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted">
              No articles found for this filter. Try selecting a different category.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
