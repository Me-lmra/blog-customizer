import { clsx } from 'clsx';
import { useState } from 'react';
import { ArticleParamsForm } from 'src/components/article-params-form';
import { defaultArticleState, type ArticleStateType } from 'src/constants/articleProps';

import { Article } from '../article/Article';

import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [appliedState, setAppliedState] =
    useState<ArticleStateType>(defaultArticleState);

  const handleApply = (newState: ArticleStateType): void => {
    setAppliedState(newState);
  };

  const handleReset = (): void => {
    setAppliedState(defaultArticleState);
  };
  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': appliedState.fontFamilyOption.value,
          '--font-size': appliedState.fontSizeOption.value,
          '--font-color': appliedState.fontColor.value,
          '--container-width': appliedState.contentWidth.value,
          '--bg-color': appliedState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        appliedState={appliedState}
        onApply={handleApply}
        onReset={handleReset}
      />
      <Article />
    </main>
  );
};
