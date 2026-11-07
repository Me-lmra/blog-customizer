import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';
import {
  defaultArticleState,
  backgroundColors,
  contentWidthArr,
  fontFamilyOptions,
  fontColors,
  fontSizeOptions,
  type ArticleStateType,
  type OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

// хук закрытия формы вне самой формы
type useOutsideClickClose = {
  isOpen: boolean;
  onChange: (newValue: boolean) => void;
  rootRef: React.RefObject<HTMLElement | null>;
};

const useOutsideClickClose = ({
  isOpen,
  onChange,
  rootRef,
}: useOutsideClickClose): void => {
  useEffect(() => {
    const handleClick = (e: MouseEvent): void => {
      const { target } = e;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        onChange(false);
      }
    };

    if (!isOpen) {
      return;
    }

    window.addEventListener('mousedown', handleClick);
    return (): void => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onChange]);
};

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const asideRef = useRef<HTMLElement | null>(null);

  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  // обработчик компонентов
  const handleOptionChange =
    (field: keyof ArticleStateType) =>
    (newOption: OptionType): void =>
      setFormState((prev) => ({ ...prev, [field]: newOption }));

  // хук и дефолт обработчики
  useOutsideClickClose({
    isOpen: isFormOpen,
    rootRef: asideRef,
    onChange: setIsFormOpen,
  });

  const handleToggle = (): void => {
    setIsFormOpen((prev) => !prev);
  }; // смена изначального состояния на противоположное

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  }; // чтобы страница не перезагружалась при клике на кнопку "применить"

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  }; // сброс формы

  return (
    <>
      <ArrowButton isOpen={isFormOpen} onClick={handleToggle} />
      <aside
        ref={asideRef}
        className={clsx(styles.container, { [styles.container_open]: isFormOpen })}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={handleOptionChange('fontFamilyOption')}
          />
          <RadioGroup
            title="размер шрифта"
            name="font-size"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleOptionChange('fontSizeOption')}
          />
          <Select
            title="цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={handleOptionChange('fontColor')}
          />
          <Separator />
          <Select
            title="цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={handleOptionChange('backgroundColor')}
          />

          <Select
            title="ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={handleOptionChange('contentWidth')}
          />
          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="reset"
              type="clear"
              onClick={handleReset}
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
