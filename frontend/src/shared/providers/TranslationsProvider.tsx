'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import { ReactNode } from 'react';
import initTranslations, { InitTranslationsParams } from '@/shared/utils/i18n/i18n';

interface ITranslationsProvider extends InitTranslationsParams {
	children: ReactNode
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: ITranslationsProvider) {
  const i18n = createInstance();

  initTranslations({locale, namespaces, i18nInstance: i18n, resources});

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}