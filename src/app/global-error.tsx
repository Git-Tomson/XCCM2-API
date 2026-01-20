'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
                    <h2>Une erreur critique est survenue</h2>
                    <p>Nous sommes désolés, une erreur inattendue s'est produite.</p>
                    <button
                        onClick={() => reset()}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Réessayer
                    </button>
                    {process.env.NODE_ENV === 'development' && (
                        <pre style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', overflow: 'auto' }}>
                            {error.message}
                            {error.stack}
                        </pre>
                    )}
                </div>
            </body>
        </html>
    );
}
