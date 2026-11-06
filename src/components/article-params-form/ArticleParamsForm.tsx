import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';
import {
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
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose.ts';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  appliedState: ArticleStateType;
  onApply: (state: ArticleStateType) => void;
  onReset: () => void;
};

export const ArticleParamsForm = ({
  appliedState,
  onApply,
  onReset,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const asideRef = useRef<HTMLDivElement | null>(null);

  const [formState, setFormState] = useState<ArticleStateType>(appliedState);

  useEffect(() => {
    setFormState(appliedState);
  }, [appliedState]);

  // обработчики компонентов
  const handleFontChange = (newOption: OptionType): void => {
    setFormState((prev) => ({
      ...prev,
      fontFamilyOption: newOption,
    }));
  };

  const handleFontSizeChange = (newOption: OptionType): void => {
    setFormState((prev) => ({
      ...prev,
      fontSizeOption: newOption,
    }));
  };

  const handleFontColorChange = (newOption: OptionType): void => {
    setFormState((prev) => ({
      ...prev,
      fontColor: newOption,
    }));
  };

  const handleBackgroundColorChange = (newOption: OptionType): void => {
    setFormState((prev) => ({
      ...prev,
      backgroundColor: newOption,
    }));
  };

  const handleContentWidthChange = (newOption: OptionType): void => {
    setFormState((prev) => ({
      ...prev,
      contentWidth: newOption,
    }));
  };

  // хуки и дефолт обработчики
  useOutsideClickClose({
    isOpen,
    rootRef: asideRef,
    onChange: setIsOpen,
  });

  const handleToggle = (): void => {
    setIsOpen((prev) => !prev);
  }; // смена изначального состояния на противоположное

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  }; // чтобы страница не перезагружалась при клике на кнопку "применить"

  const handleReset = (): void => {
    setFormState(appliedState);
    onReset();
  }; // сброс формы

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      <aside
        ref={asideRef}
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Text as="h1" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={handleFontChange}
          />
          <RadioGroup
            title="размер шрифта"
            name="font-size"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleFontSizeChange}
          />
          <Select
            title="цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={handleFontColorChange}
          />
          <Separator />
          <Select
            title="цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={handleBackgroundColorChange}
          />

          <Select
            title="ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={handleContentWidthChange}
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
