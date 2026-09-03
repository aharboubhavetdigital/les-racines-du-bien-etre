import React from 'react';
import { JournalArticle } from '../types';
import { X, Clock, Calendar, User, Bookmark, Share2 } from 'lucide-react';

interface ArticleModalProps {
  article: JournalArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#181614] text-white rounded-2xl shadow-2xl border border-white/15 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#AEB9A9]">
            Journal • {article.category}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
          
          {/* Article Header */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#AEB9A9]" />
                {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#AEB9A9]" />
                {article.readTime} de lecture
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#AEB9A9]" />
                {article.author}
              </span>
            </div>

            <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              {article.title}
            </h1>

            <p className="font-sans text-base text-white/80 italic font-light leading-relaxed border-l-2 border-[#AEB9A9] pl-4">
              « {article.excerpt} »
            </p>
          </div>

          {/* Featured Image */}
          <div className="aspect-16/9 rounded-xl overflow-hidden border border-white/10">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
            />
          </div>

          {/* Key Takeaways Box */}
          <div className="p-6 liquid-glass border border-white/10 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#AEB9A9]">
              <Bookmark className="w-4 h-4" />
              <span>L’essentiel à retenir</span>
            </div>
            <ul className="space-y-2 font-sans text-xs sm:text-sm text-white/90">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AEB9A9] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Paragraphs */}
          <div className="space-y-6 font-sans text-base text-white/80 font-light leading-relaxed">
            {article.contentParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Article Footer & Actions */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="text-xs text-white/60">
              Écrit avec soin par <strong className="text-white">{article.author}</strong>
            </div>

            <button
              onClick={() => {
                alert('Lien de l’article copié dans votre presse-papier.');
              }}
              className="px-4 py-2 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-white/10 flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#AEB9A9]" />
              <span>Partager</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
