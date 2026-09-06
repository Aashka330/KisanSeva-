import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import Card from '../ui/Card';
import type { NewsArticle } from '../../data/news';

interface NewsArticleCardProps {
  article: NewsArticle;
}

export default function NewsArticleCard({ article }: NewsArticleCardProps) {
  return (
    <Card hover className="group flex flex-col overflow-hidden p-0">
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-green/60 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 text-xs font-medium text-white bg-deep-green/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {article.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-bold text-deep-green font-heading leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-muted flex-1 line-clamp-3">{article.excerpt}</p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="text-xs text-muted flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {article.date}
          </span>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-leaf hover:text-deep-green flex items-center gap-1 transition-colors"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <p className="mt-2 text-[11px] text-muted flex items-center gap-1">
          <ExternalLink className="w-3 h-3" /> Source: {article.source}
        </p>
      </div>
    </Card>
  );
}
