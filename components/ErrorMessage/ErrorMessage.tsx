import css from './ErrorMessage.module.css';

interface Props {
  message?: string;
}

export default function ErrorMessage({
  message = 'Something went wrong',
}: Props) {
  return (
    <div className={css.container}>
      <p className={css.text}>{message}</p>
    </div>
  );
}
