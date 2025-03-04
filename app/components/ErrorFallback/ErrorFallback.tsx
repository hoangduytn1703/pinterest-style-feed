import * as styles from './ErrorFallback.css';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <h2 className={styles.errorTitle}>Đã xảy ra lỗi</h2>
      <p className={styles.errorMessage}>{error.message}</p>
      <button 
        onClick={resetErrorBoundary}
        className={styles.retryButton}
      >
        Thử lại
      </button>
    </div>
  );
} 