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
    <Container>
      {disabledText && <small>{disabledText}</small>}
      <input
        id={inputId}
        type="checkbox"
        checked={value === enabledValue}
        onChange={
          onChange &&
          (e => onChange(e.target.checked ? enabledValue : disabledValue))
        }
      />
      <Toggle htmlFor={inputId} enabled={value === enabledValue}>
        <div className="track">
          <div className="thumb" />
        </div>
      </Toggle>
      {enabledText && <small>{enabledText}</small>}
    </Container>
  );
}
