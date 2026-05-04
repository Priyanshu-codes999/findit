import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import type { TranslationKey } from '../lib/translations';

export const useTranslation = () => {
  const language = useStore((state) => state.language);
  
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };
  
  return { t, language };
};
