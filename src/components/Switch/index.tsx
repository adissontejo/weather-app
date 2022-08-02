import { useId } from 'react';

import { Container, Toggle } from './styles';

export type SwitchProps<T> = {
  value?: T;
  disabledValue?: T;
  enabledValue?: T;
  disabledText?: string;
  enabledText?: string;
  onChange?: (value: T) => void;
};

export function Switch<T>({
  value,
  disabledValue,
  enabledValue,
  disabledText,
  enabledText,
  onChange,
}: SwitchProps<T>) {
  const inputId = useId();

  return (
    <Container data-testid="switch-component">
      {disabledText && <small>{disabledText}</small>}
      <input
        id={inputId}
        type="checkbox"
        checked={value === enabledValue}
        readOnly={!onChange}
        onChange={
          onChange &&
          (e => onChange(e.target.checked ? enabledValue : disabledValue))
        }
      />
      <Toggle role="button" htmlFor={inputId} enabled={value === enabledValue}>
        <div className="track">
          <div className="thumb" />
        </div>
      </Toggle>
      {enabledText && <small>{enabledText}</small>}
    </Container>
  );
}
