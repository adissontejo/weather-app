import { useId } from 'react';

import { Container, Toggle } from './styles';

export type SwitchProps = {
  value?: boolean;
  disabledText?: string;
  enabledText?: string;
  onChange?: (value: boolean) => void;
};

export const Switch = ({
  value,
  disabledText,
  enabledText,
  onChange,
}: SwitchProps) => {
  const inputId = useId();

  return (
    <Container>
      {disabledText && <small>{disabledText}</small>}
      <input
        id={inputId}
        type="checkbox"
        checked={value}
        onChange={onChange && (e => onChange(e.target.checked))}
      />
      <Toggle htmlFor={inputId} enabled={value}>
        <div className="track">
          <div className="thumb" />
        </div>
      </Toggle>
      {enabledText && <small>{enabledText}</small>}
    </Container>
  );
};
