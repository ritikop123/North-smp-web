import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export const LoginPage: React.FC = () => {
    const { user, login, logout, showToast } = useStore();
    const navigate = useNavigate();

    const [platform, setPlatform] = useState<'java' | 'bedrock'>(user?.platform || 'java');
    const [username, setUsername] = useState(user?.username || '');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = username.trim();
        if (!trimmed) {
            showToast('Please enter your Minecraft username', 'error');
            return;
        }

        // For bedrock, standard notation often prepends dot if not already there, but we preserve user input
        const finalIgn = (platform === 'bedrock' && !trimmed.startsWith('.')) ? '.' + trimmed : trimmed;
        login(finalIgn, platform);
        navigate('/');
    };

    const trimmedInput = username.trim();
    const previewIgn = (platform === 'bedrock' && trimmedInput && !trimmedInput.startsWith('.'))
        ? '.' + trimmedInput
        : trimmedInput;
    const avatarUrl = previewIgn ? `https://mc-heads.net/avatar/${encodeURIComponent(previewIgn)}/64` : '';

    return (
        <div className="login-page" style={{ maxWidth: '520px', margin: '2rem auto 4rem', padding: '0 1rem' }}>
            <div
                style={{
                    background: 'var(--block-color)',
                    border: 'var(--block-border-width) solid var(--block-border)',
                    borderRadius: 'var(--border-radius)',
                    boxShadow: 'var(--box-shadow)',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <div className="category-page-accent-block"></div>

                <div style={{ padding: '2.5rem 2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <i
                            className="fa-solid fa-gamepad"
                            style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem' }}
                        ></i>
                        <h1 className="text-header" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                            {user ? 'Player Session' : 'Store Authentication'}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            {user
                                ? 'You are currently authenticated for in-game purchases.'
                                : 'Enter your Minecraft username so your purchases can be delivered in-game.'}
                        </p>
                    </div>

                    {user ? (
                        /* Logged In View */
                        <div style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    background: 'var(--block-dark)',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--block-border)',
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    justifyContent: 'center'
                                }}
                            >
                                <img
                                    src={user.avatarUrl}
                                    alt={user.username}
                                    style={{ width: '64px', height: '64px', borderRadius: '8px' }}
                                />
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                                        {user.username}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--positive)' }}>
                                        Edition: {user.platform.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={logout}
                                    style={{ flex: 1, justifyContent: 'center' }}
                                >
                                    <i className="fa-solid fa-right-from-bracket" style={{ marginRight: '6px' }}></i> Sign Out
                                </button>
                                <button
                                    type="button"
                                    className="primary-button"
                                    onClick={() => navigate('/')}
                                    style={{ flex: 1, justifyContent: 'center' }}
                                >
                                    Continue to Store
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Login Form */
                        <form onSubmit={handleLogin}>
                            {/* Platform Toggle */}
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setPlatform('java')}
                                    className={`secondary-button ${platform === 'java' ? 'active' : ''}`}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        background: platform === 'java' ? 'var(--primary-color)' : 'var(--block-dark)',
                                        color: platform === 'java' ? '#fff' : 'var(--text-secondary)'
                                    }}
                                >
                                    <i className="fa-brands fa-java" style={{ marginRight: '6px' }}></i> Java Edition
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPlatform('bedrock')}
                                    className={`secondary-button ${platform === 'bedrock' ? 'active' : ''}`}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        background: platform === 'bedrock' ? 'var(--primary-color)' : 'var(--block-dark)',
                                        color: platform === 'bedrock' ? '#fff' : 'var(--text-secondary)'
                                    }}
                                >
                                    <i className="fa-solid fa-mobile-screen" style={{ marginRight: '6px' }}></i> Bedrock Edition
                                </button>
                            </div>

                            {/* Username Input */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                                    Minecraft {platform === 'bedrock' ? 'Bedrock Gamertag' : 'Java Username'}
                                </label>
                                <input
                                    type="text"
                                    placeholder={platform === 'bedrock' ? 'e.g. PlayerName' : 'e.g. Notch'}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{
                                        width: '100%',
                                        background: 'var(--block-dark)',
                                        border: '1px solid var(--block-border)',
                                        borderRadius: '8px',
                                        padding: '12px 16px',
                                        color: 'var(--text-primary)',
                                        fontSize: '1rem'
                                    }}
                                    autoFocus
                                    required
                                />
                                {platform === 'bedrock' && (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>
                                        Note: A prefix period (.) will be added automatically for Bedrock players.
                                    </span>
                                )}
                            </div>

                            {/* Live Avatar Preview */}
                            {previewIgn && (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '10px 14px',
                                        background: 'var(--block-dark)',
                                        borderRadius: '8px',
                                        marginBottom: '1.5rem',
                                        border: '1px solid var(--block-border)'
                                    }}
                                >
                                    <img
                                        src={avatarUrl}
                                        alt="Skin Preview"
                                        style={{ width: '40px', height: '40px', borderRadius: '4px' }}
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/64';
                                        }}
                                    />
                                    <div>
                                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{previewIgn}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--positive)' }}>Skin detected</div>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="primary-button"
                                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                            >
                                <i className="fa-solid fa-right-to-bracket" style={{ marginRight: '8px' }}></i>
                                Enter Store
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
