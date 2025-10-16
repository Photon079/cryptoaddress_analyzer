import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { riskAssessmentService, type RiskAssessment } from '../../backend/services/blockchain';
import { getRiskColor, getRiskIcon } from '../../shared/utils';
import './index.css';

function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #0f0f23, #1a1a2e), radial-gradient(ellipse at bottom, #16213e, #0f0f23)',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        position: 'relative',
        overflowX: 'hidden'
      }}>
        {/* Animated background particles */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: '#7aa2f7',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`
            }} />
          ))}
        </div>

        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
            25% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
            50% { transform: translateY(-10px) translateX(-5px); opacity: 0.2; }
            75% { transform: translateY(-30px) translateX(15px); opacity: 0.4; }
          }

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(122, 162, 247, 0.2); }
            50% { box-shadow: 0 0 40px rgba(122, 162, 247, 0.4), 0 0 60px rgba(180, 249, 248, 0.2); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }
        `}</style>
      </div>
    </Router>
  );
}

function Navbar() {
  return (
    <nav style={{
      background: 'rgba(26, 27, 38, 0.95)',
      backdropFilter: 'blur(25px)',
      borderBottom: '1px solid rgba(122, 162, 247, 0.15)',
      padding: '1.2rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #7aa2f7 0%, #b4f9f8 50%, #7aa2f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #7aa2f7 0%, #b4f9f8 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px'
          }}>
            <img src="./logo.jpg" alt="" style={{
              width:'32px',
              height: '32px',
              objectFit: 'cover',
              borderRadius: '8px'
            }} />
          </div>
          Blocktrace
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{
            color: '#a9b1d6',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.1)';
            e.currentTarget.style.color = '#7aa2f7';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#a9b1d6';
          }}>
            Home
          </Link>
          <Link to="/search" style={{
            color: '#a9b1d6',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.1)';
            e.currentTarget.style.color = '#7aa2f7';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#a9b1d6';
          }}>
            Search
          </Link>
          <Link to="/dashboard" style={{
            color: '#a9b1d6',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.1)';
            e.currentTarget.style.color = '#7aa2f7';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#a9b1d6';
          }}>
            Dashboard
          </Link>
          <Link to="/login" style={{
            background: 'linear-gradient(135deg, #7aa2f7 0%, #b4f9f8 100%)',
            color: '#0f0f23',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(122, 162, 247, 0.3)',
            transition: 'all 0.2s ease'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(122, 162, 247, 0.4)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(122, 162, 247, 0.3)';
          }}>
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <div style={{
      padding: '6rem 2rem 4rem',
      maxWidth: '1400px',
      margin: '0 auto',
      color: '#a9b1d6',
      position: 'relative'
    }}>
      {/* Enhanced background effects */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(122, 162, 247, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'pulse 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '8%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(180, 249, 248, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        animation: 'pulse 10s ease-in-out infinite reverse'
      }} />

      <div style={{ textAlign: 'center', marginBottom: '6rem', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(122, 162, 247, 0.1)',
          padding: '0.5rem 1.5rem',
          borderRadius: '50px',
          border: '1px solid rgba(122, 162, 247, 0.2)',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          color: '#7aa2f7',
          fontWeight: '500'
        }}>
          <span>✨</span>
          Trusted by 10,000+ crypto professionals worldwide
        </div>

        <h1 style={{
          fontSize: '4.5rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #7aa2f7 0%, #b4f9f8 50%, #7aa2f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '2.5rem',
          lineHeight: '1.1',
          letterSpacing: '-0.025em',
          maxWidth: '900px',
          margin: '0 auto 2.5rem'
        }}>
          Cryptocurrency Address
          <br />
          Intelligence Platform
        </h1>

        <p style={{
          fontSize: '1.35rem',
          color: '#9aa5ce',
          maxWidth: '800px',
          margin: '0 auto 4rem',
          lineHeight: '1.7',
          fontWeight: '400'
        }}>
          Harness the power of artificial intelligence and blockchain analytics to uncover hidden risks,
          verify transaction legitimacy, and make informed decisions in the cryptocurrency ecosystem.
          <br /><br />
          <strong>From DeFi protocols to individual addresses</strong> — our platform provides enterprise-grade
          intelligence for every crypto use case.
        </p>

        {/* Trust indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          {[
            { number: '99.7%', label: 'Accuracy Rate' },
            { number: '< 2s', label: 'Analysis Speed' },
            { number: '24/7', label: 'Real-time Updates' },
            { number: 'SOC 2', label: 'Certified Security' }
          ].map((stat, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '1rem',
              background: 'rgba(30, 33, 40, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(122, 162, 247, 0.1)',
              minWidth: '120px'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#7aa2f7',
                marginBottom: '0.25rem'
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#9aa5ce',
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/search" style={{
            background: 'linear-gradient(135deg, #7aa2f7 0%, #b4f9f8 100%)',
            color: '#0f0f23',
            padding: '1.2rem 2.5rem',
            borderRadius: '16px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.125rem',
            boxShadow: '0 8px 25px rgba(122, 162, 247, 0.4)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(122, 162, 247, 0.5)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(122, 162, 247, 0.4)';
          }}>
            <span style={{ fontSize: '1.5rem' }}>🚀</span>
            Start Analysis
          </Link>

          <Link to="/dashboard" style={{
            background: 'rgba(122, 162, 247, 0.08)',
            color: '#7aa2f7',
            padding: '1.2rem 2.5rem',
            borderRadius: '16px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.125rem',
            border: '2px solid rgba(122, 162, 247, 0.2)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(122, 162, 247, 0.4)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(122, 162, 247, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <span>📊</span>
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Product Information Section */}
      <div style={{
        background: 'rgba(30, 33, 40, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '4rem',
        border: '1px solid rgba(122, 162, 247, 0.1)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
        marginBottom: '4rem',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Trusted by Professionals Worldwide Section */}
        <div style={{
          background: 'rgba(30, 33, 40, 0.7)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '4rem',
          border: '1px solid rgba(122, 162, 247, 0.1)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
          marginBottom: '4rem',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 style={{
            color: '#7aa2f7',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            Trusted by Professionals Worldwide
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}>
            <div>
              <h3 style={{
                color: '#7aa2f7',
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                fontWeight: '600'
              }}>
                👥 Who Uses Blocktrace
              </h3>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  background: 'rgba(26, 27, 38, 0.8)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(122, 162, 247, 0.1)',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ color: '#7aa2f7', marginBottom: '0.5rem', fontSize: '1rem' }}>🏦 Financial Institutions</h4>
                  <p style={{ color: '#9aa5ce', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Major banks and investment firms use our platform for due diligence on cryptocurrency investments,
                    compliance monitoring, and risk assessment of digital assets before portfolio inclusion.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(26, 27, 38, 0.8)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(122, 162, 247, 0.1)',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ color: '#7aa2f7', marginBottom: '0.5rem', fontSize: '1rem' }}>💼 DeFi Protocols</h4>
                  <p style={{ color: '#9aa5ce', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Leading DeFi platforms and DEXs integrate our intelligence to monitor liquidity pools,
                    detect suspicious activities, ensure platform security, and protect their users from
                    malicious actors.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(26, 27, 38, 0.8)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(122, 162, 247, 0.1)',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ color: '#7aa2f7', marginBottom: '0.5rem', fontSize: '1rem' }}>🔍 Security Researchers</h4>
                  <p style={{ color: '#9aa5ce', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Cybersecurity professionals and blockchain analysts rely on our platform for
                    threat intelligence, vulnerability research, and understanding emerging attack patterns.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(26, 27, 38, 0.8)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(122, 162, 247, 0.1)'
                }}>
                  <h4 style={{ color: '#7aa2f7', marginBottom: '0.5rem', fontSize: '1rem' }}>👥 Individual Investors</h4>
                  <p style={{ color: '#9aa5ce', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    From crypto enthusiasts to high-net-worth individuals, users leverage our tools to
                    research addresses before transactions and protect their digital wealth.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{
                color: '#7aa2f7',
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                fontWeight: '600'
              }}>
                🎯 Key Benefits
              </h3>

              <div style={{
                background: 'rgba(26, 27, 38, 0.8)',
                borderRadius: '20px',
                padding: '3rem',
                border: '1px solid rgba(122, 162, 247, 0.1)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '2rem'
                }}>
                  <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    background: 'rgba(15, 20, 33, 0.6)',
                    borderRadius: '16px',
                    border: '1px solid rgba(122, 162, 247, 0.1)'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
                    <h4 style={{ color: '#7aa2f7', marginBottom: '1rem', fontSize: '1.25rem' }}>Prevent Financial Losses</h4>
                    <p style={{ color: '#9aa5ce', lineHeight: '1.6' }}>
                      Our early warning system has helped users avoid over $2.3 million in potential losses
                      from fraudulent addresses and scam tokens in the last quarter alone.
                    </p>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#7aa2f7',
                      marginTop: '1rem',
                      background: 'rgba(122, 162, 247, 0.1)',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      display: 'inline-block'
                    }}>
                      $2.3M+ Saved
                    </div>
                  </div>

                  <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    background: 'rgba(15, 20, 33, 0.6)',
                    borderRadius: '16px',
                    border: '1px solid rgba(122, 162, 247, 0.1)'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                    <h4 style={{ color: '#7aa2f7', marginBottom: '1rem', fontSize: '1.25rem' }}>Save Time & Resources</h4>
                    <p style={{ color: '#9aa5ce', lineHeight: '1.6' }}>
                      What used to take hours of manual research now takes seconds. Our automated analysis
                      processes thousands of addresses simultaneously.
                    </p>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#7aa2f7',
                      marginTop: '1rem',
                      background: 'rgba(122, 162, 247, 0.1)',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      display: 'inline-block'
                    }}>
                      99.7% Faster
                    </div>
                  </div>

                  <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    background: 'rgba(15, 20, 33, 0.6)',
                    borderRadius: '16px',
                    border: '1px solid rgba(122, 162, 247, 0.1)'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
                    <h4 style={{ color: '#7aa2f7', marginBottom: '1rem', fontSize: '1.25rem' }}>Ensure Compliance</h4>
                    <p style={{ color: '#9aa5ce', lineHeight: '1.6' }}>
                      Stay ahead of regulatory requirements with comprehensive AML monitoring,
                      transaction tracing, and compliance reporting features.
                    </p>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#7aa2f7',
                      marginTop: '1rem',
                      background: 'rgba(122, 162, 247, 0.1)',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      display: 'inline-block'
                    }}>
                      100% Compliant
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div style={{
          background: 'rgba(30, 33, 40, 0.7)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '4rem',
          border: '1px solid rgba(122, 162, 247, 0.1)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
          marginBottom: '4rem',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 style={{
            color: '#7aa2f7',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            Advanced Technology Stack
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'rgba(26, 27, 38, 0.8)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(122, 162, 247, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
              <h3 style={{ color: '#7aa2f7', marginBottom: '1rem', fontSize: '1.25rem' }}>AI-Powered Analysis</h3>
              <p style={{ color: '#9aa5ce', lineHeight: '1.6' }}>
                Machine learning algorithms trained on millions of blockchain transactions to identify
                patterns and anomalies with industry-leading accuracy rates.
              </p>
            </div>

            <div style={{
              background: 'rgba(26, 27, 38, 0.8)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(122, 162, 247, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ color: '#7aa2f7', marginBottom: '1rem', fontSize: '1.25rem' }}>Real-Time Processing</h3>
              <p style={{ color: '#9aa5ce', lineHeight: '1.6' }}>
                Sub-second analysis powered by distributed computing infrastructure,
                processing thousands of addresses simultaneously across multiple blockchains.
              </p>
            </div>

            <div style={{
              background: 'rgba(26, 27, 38, 0.8)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(122, 162, 247, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ color: '#7aa2f7', marginBottom: '1rem', fontSize: '1.25rem' }}>Enterprise Security</h3>
              <p style={{ color: '#9aa5ce', lineHeight: '1.6' }}>
                SOC 2 Type II certified with end-to-end encryption, ensuring your data
                remains private and secure at all times with zero-knowledge architecture.
              </p>
            </div>
          </div>

          <div style={{
            background: 'rgba(26, 27, 38, 0.8)',
            borderRadius: '20px',
            padding: '3rem',
            border: '1px solid rgba(122, 162, 247, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#7aa2f7',
              fontSize: '1.75rem',
              marginBottom: '2rem',
              fontWeight: '600'
            }}>
              🌐 Multi-Chain Intelligence Coverage
            </h3>
            <p style={{
              color: '#9aa5ce',
              fontSize: '1.1rem',
              lineHeight: '1.7',
              marginBottom: '2rem'
            }}>
              Comprehensive coverage across Bitcoin, Ethereum, and 50+ other major blockchain networks
              with continuous expansion to emerging chains and Layer 2 solutions.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              {['Bitcoin', 'Ethereum', 'Litecoin', 'Solana', 'Polygon', 'Avalanche', 'Cardano', 'Binance Smart Chain'].map((chain) => (
                <div key={chain} style={{
                  background: 'rgba(122, 162, 247, 0.1)',
                  color: '#7aa2f7',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: '1px solid rgba(122, 162, 247, 0.2)',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {chain}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div style={{
          background: 'rgba(30, 33, 40, 0.7)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '4rem',
          border: '1px solid rgba(122, 162, 247, 0.1)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
          marginBottom: '4rem',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 style={{
            color: '#7aa2f7',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            Real-World Impact
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'rgba(26, 27, 38, 0.8)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(72, 187, 120, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(122, 162, 247, 0.05) 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                margin: '0 auto 1rem'
              }}>💰</div>
              <h3 style={{ color: '#48bb78', marginBottom: '1rem', fontSize: '1.25rem' }}>Financial Institution</h3>
              <p style={{ color: '#9aa5ce', lineHeight: '1.6', fontSize: '0.9rem' }}>
                "Blocktrace's due diligence platform prevented a $1.2 million loss from a sophisticated
                phishing scam targeting our treasury operations. The real-time alerts saved us from disaster."
              </p>
              <div style={{
                fontSize: '0.875rem',
                color: '#48bb78',
                marginTop: '1rem',
                fontWeight: '600'
              }}>
                — Head of Risk Management, Major Investment Bank
              </div>
            </div>

            <div style={{
              background: 'rgba(26, 27, 38, 0.8)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(122, 162, 247, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, rgba(122, 162, 247, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                margin: '0 auto 1rem'
              }}>💼</div>
              <h3 style={{ color: '#7aa2f7', marginBottom: '1rem', fontSize: '1.25rem' }}>DeFi Protocol</h3>
              <p style={{ color: '#9aa5ce', lineHeight: '1.6', fontSize: '0.9rem' }}>
                "The integration of Blocktrace's security intelligence has reduced suspicious transactions
                by 87% while maintaining our user experience. Essential for DeFi security."
              </p>
              <div style={{
                fontSize: '0.875rem',
                color: '#7aa2f7',
                marginTop: '1rem',
                fontWeight: '600'
              }}>
                — CTO, Leading DEX Platform
              </div>
            </div>

            <div style={{
              background: 'rgba(26, 27, 38, 0.8)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(237, 137, 54, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, rgba(237, 137, 54, 0.1) 0%, rgba(72, 187, 120, 0.05) 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                margin: '0 auto 1rem'
              }}>🔍</div>
              <h3 style={{ color: '#ed8936', marginBottom: '1rem', fontSize: '1.25rem' }}>Security Researcher</h3>
              <p style={{ color: '#9aa5ce', lineHeight: '1.6', fontSize: '0.9rem' }}>
                "Blocktrace's threat intelligence feeds have accelerated our research by 10x.
                The quality of data and analysis is unmatched in the industry."
              </p>
              <div style={{
                fontSize: '0.875rem',
                color: '#ed8936',
                marginTop: '1rem',
                fontWeight: '600'
              }}>
                — Senior Researcher, Blockchain Security Firm
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(26, 27, 38, 0.8)',
            borderRadius: '20px',
            padding: '3rem',
            border: '1px solid rgba(122, 162, 247, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#7aa2f7',
              fontSize: '1.75rem',
              marginBottom: '2rem',
              fontWeight: '600'
            }}>
              📈 Platform Statistics
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem'
            }}>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#7aa2f7',
                  marginBottom: '0.5rem'
                }}>
                  50M+
                </div>
                <div style={{ color: '#9aa5ce', fontSize: '1rem' }}>
                  Addresses Analyzed
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#7aa2f7',
                  marginBottom: '0.5rem'
                }}>
                  99.7%
                </div>
                <div style={{ color: '#9aa5ce', fontSize: '1rem' }}>
                  Accuracy Rate
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#7aa2f7',
                  marginBottom: '0.5rem'
                }}>
                  10K+
                </div>
                <div style={{ color: '#9aa5ce', fontSize: '1rem' }}>
                  Active Users
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#7aa2f7',
                  marginBottom: '0.5rem'
                }}>
                  $2.3M
                </div>
                <div style={{ color: '#9aa5ce', fontSize: '1rem' }}>
                  Losses Prevented
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 33, 40, 0.9) 0%, rgba(26, 27, 38, 0.8) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '4rem',
          border: '1px solid rgba(122, 162, 247, 0.15)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 style={{
            color: '#7aa2f7',
            fontSize: '2.5rem',
            marginBottom: '2rem',
            fontWeight: '700'
          }}>
            Ready to Secure Your Crypto Operations?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#9aa5ce',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            Join thousands of professionals who trust Blocktrace for their cryptocurrency security intelligence.
            Start protecting your assets today.
          </p>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/search" style={{
              background: 'linear-gradient(135deg, #7aa2f7 0%, #b4f9f8 100%)',
              color: '#0f0f23',
              padding: '1.5rem 3rem',
              borderRadius: '16px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1.25rem',
              boxShadow: '0 8px 25px rgba(122, 162, 247, 0.4)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(122, 162, 247, 0.5)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(122, 162, 247, 0.4)';
            }}>
              <span style={{ fontSize: '1.75rem' }}>🚀</span>
              Start Free Analysis
            </Link>

            <Link to="/dashboard" style={{
              background: 'rgba(122, 162, 247, 0.08)',
              color: '#7aa2f7',
              padding: '1.5rem 3rem',
              borderRadius: '16px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.25rem',
              border: '2px solid rgba(122, 162, 247, 0.2)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(122, 162, 247, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(122, 162, 247, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <span>📊</span>
              View Intelligence Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchPage() {
  const [address, setAddress] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<RiskAssessment | null>(null);
  const [error, setError] = useState<string>('');

  const handleAnalyze = async () => {
    if (!address.trim()) return;

    setIsAnalyzing(true);
    setError('');
    setAnalysisResult(null);

    try {
      // Detect blockchain type from address format
      let blockchain: 'ethereum' | 'bitcoin' = 'bitcoin';

      if (address.startsWith('0x') && address.length === 42) {
        blockchain = 'ethereum';
      } else if (address.startsWith('bc1') || address.startsWith('1') || address.startsWith('3')) {
        blockchain = 'bitcoin';
      } else {
        throw new Error('Unsupported address format. Please enter a valid Bitcoin or Ethereum address.');
      }

      // Perform risk assessment
      const result = await riskAssessmentService.assessAddress(address, blockchain);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      setError(error instanceof Error ? error.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{
      padding: '6rem 2rem 4rem',
      maxWidth: '900px',
      margin: '0 auto',
      color: '#a9b1d6',
      position: 'relative'
    }}>
      <div style={{ marginBottom: '3rem' }}>
        <Link to="/" style={{
          color: '#7aa2f7',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          transition: 'all 0.2s ease'
        }} onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.1)';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          color: '#7aa2f7',
          marginBottom: '1rem'
        }}>
          Address Analysis
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#9aa5ce',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Enter any cryptocurrency address for comprehensive risk assessment and security analysis
        </p>
      </div>

      <div style={{
        background: 'rgba(30, 33, 40, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '3rem',
        border: '1px solid rgba(122, 162, 247, 0.1)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            fontWeight: '600',
            marginBottom: '0.75rem',
            fontSize: '1.125rem',
            color: '#7aa2f7'
          }}>
            Cryptocurrency Address
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g., bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh (Bitcoin) or 0x742d35Cc6634C0532925a3b8D807A7C8c5D0E6F (Ethereum)"
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                border: '2px solid rgba(122, 162, 247, 0.2)',
                background: 'rgba(15, 20, 33, 0.8)',
                color: '#a9b1d6',
                fontSize: '1rem',
                fontFamily: 'Monaco, Menlo, monospace',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(122, 162, 247, 0.4)';
                e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.9)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(122, 162, 247, 0.2)';
                e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.8)';
              }}
            />
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!address.trim() || isAnalyzing}
          style={{
            width: '100%',
            background: isAnalyzing
              ? 'linear-gradient(135deg, #565f89 0%, #4a5568 100%)'
              : 'linear-gradient(135deg, #7aa2f7 0%, #b4f9f8 100%)',
            color: '#0f0f23',
            padding: '1rem 2rem',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '600',
            fontSize: '1.125rem',
            cursor: address.trim() && !isAnalyzing ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'all 0.2s ease',
            boxShadow: address.trim() && !isAnalyzing
              ? '0 4px 20px rgba(122, 162, 247, 0.3)'
              : 'none',
            opacity: address.trim() && !isAnalyzing ? 1 : 0.6
          }}
        >
          {isAnalyzing ? (
            <>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid #0f0f23',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Analyzing Address...
            </>
          ) : (
            <>
              <span style={{ fontSize: '1.25rem' }}>🚀</span>
              Analyze Address
            </>
          )}
        </button>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>

        {error && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(245, 101, 101, 0.1)',
            border: '1px solid rgba(245, 101, 101, 0.3)',
            borderRadius: '8px',
            color: '#f56565'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {analysisResult && (
          <div style={{
            marginTop: '2rem',
            padding: '2rem',
            background: 'rgba(30, 33, 40, 0.8)',
            borderRadius: '16px',
            border: `1px solid ${getRiskColor(analysisResult.riskLevel)}`,
            boxShadow: `0 8px 25px ${getRiskColor(analysisResult.riskLevel)}20`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2rem' }}>{getRiskIcon(analysisResult.riskLevel)}</span>
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: getRiskColor(analysisResult.riskLevel),
                  margin: '0'
                }}>
                  Risk Level: {analysisResult.riskLevel.toUpperCase()}
                </h3>
                <p style={{ color: '#9aa5ce', margin: '0.25rem 0 0 0' }}>
                  Risk Score: {analysisResult.riskScore}/100
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#7aa2f7', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                Risk Factors:
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {analysisResult.factors.map((factor, index) => (
                  <span key={index} style={{
                    background: 'rgba(237, 137, 54, 0.2)',
                    color: '#ed8936',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(237, 137, 54, 0.3)',
                    fontSize: '0.875rem'
                  }}>
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              fontSize: '0.875rem',
              color: '#9aa5ce',
              borderTop: '1px solid rgba(122, 162, 247, 0.2)',
              paddingTop: '1rem'
            }}>
              Last updated: {new Date(analysisResult.lastUpdated).toLocaleString()}
            </div>
          </div>
        )}

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(15, 20, 33, 0.6)',
          borderRadius: '8px',
          border: '1px solid rgba(122, 162, 247, 0.1)'
        }}>
          <h4 style={{ color: '#7aa2f7', marginBottom: '0.5rem', fontSize: '1rem' }}>
            💡 Supported Networks
          </h4>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            fontSize: '0.875rem',
            color: '#9aa5ce'
          }}>
            <span style={{
              background: 'rgba(122, 162, 247, 0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              border: '1px solid rgba(122, 162, 247, 0.2)'
            }}>Bitcoin (BTC)</span>
            <span style={{
              background: 'rgba(122, 162, 247, 0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              border: '1px solid rgba(122, 162, 247, 0.2)'
            }}>Ethereum (ETH)</span>
            <span style={{
              background: 'rgba(122, 162, 247, 0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              border: '1px solid rgba(122, 162, 247, 0.2)'
            }}>Real-time Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(122, 162, 247, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)'
      }} />

      <div style={{
        background: 'rgba(30, 33, 40, 0.95)',
        backdropFilter: 'blur(25px)',
        borderRadius: '24px',
        padding: '4rem',
        border: '1px solid rgba(122, 162, 247, 0.1)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '450px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #7aa2f7 0%, #b4f9f8 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            margin: '0 auto 1.5rem'
          }}>🔐</div>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            color: '#7aa2f7',
            marginBottom: '0.5rem'
          }}>
            Welcome Back
          </h1>
          <p style={{ color: '#9aa5ce', fontSize: '1.125rem' }}>
            Sign in to your Blocktrace account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.75rem',
              fontSize: '1rem',
              color: '#7aa2f7'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(122, 162, 247, 0.2)',
                  background: 'rgba(15, 20, 33, 0.8)',
                  color: '#a9b1d6',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(122, 162, 247, 0.4)';
                  e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.9)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(122, 162, 247, 0.2)';
                  e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.8)';
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.75rem',
              fontSize: '1rem',
              color: '#7aa2f7'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(122, 162, 247, 0.2)',
                  background: 'rgba(15, 20, 33, 0.8)',
                  color: '#a9b1d6',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(122, 162, 247, 0.4)';
                  e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.9)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(122, 162, 247, 0.2)';
                  e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.8)';
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: isLoading
                ? 'linear-gradient(135deg, #565f89 0%, #4a5568 100%)'
                : 'linear-gradient(135deg, #7aa2f7 0%, #b4f9f8 100%)',
              color: '#0f0f23',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: 'none',
              fontWeight: '600',
              fontSize: '1.125rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease',
              boxShadow: isLoading ? 'none' : '0 4px 20px rgba(122, 162, 247, 0.3)',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #0f0f23',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Signing In...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/register" style={{
            color: '#7aa2f7',
            textDecoration: 'none',
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            display: 'inline-block'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.1)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}>
            Don't have an account? <strong>Sign up →</strong>
          </Link>
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(180, 249, 248, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }} />

      <div style={{
        background: 'rgba(30, 33, 40, 0.95)',
        backdropFilter: 'blur(25px)',
        borderRadius: '24px',
        padding: '4rem',
        border: '1px solid rgba(122, 162, 247, 0.1)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '450px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #7aa2f7 0%, #b4f9f8 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            margin: '0 auto 1.5rem'
          }}>📝</div>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            color: '#7aa2f7',
            marginBottom: '0.5rem'
          }}>
            Create Account
          </h1>
          <p style={{ color: '#9aa5ce', fontSize: '1.125rem' }}>
            Join Blocktrace for advanced crypto analysis
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.75rem',
              fontSize: '1rem',
              color: '#7aa2f7'
            }}>
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '2px solid rgba(122, 162, 247, 0.2)',
                background: 'rgba(15, 20, 33, 0.8)',
                color: '#a9b1d6',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(122, 162, 247, 0.4)';
                e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.9)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(122, 162, 247, 0.2)';
                e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.8)';
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.75rem',
              fontSize: '1rem',
              color: '#7aa2f7'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '2px solid rgba(122, 162, 247, 0.2)',
                background: 'rgba(15, 20, 33, 0.8)',
                color: '#a9b1d6',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(122, 162, 247, 0.4)';
                e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.9)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(122, 162, 247, 0.2)';
                e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.8)';
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.75rem',
              fontSize: '1rem',
              color: '#7aa2f7'
            }}>
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '2px solid rgba(122, 162, 247, 0.2)',
                background: 'rgba(15, 20, 33, 0.8)',
                color: '#a9b1d6',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(122, 162, 247, 0.4)';
                e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.9)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(122, 162, 247, 0.2)';
                e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.8)';
              }}
            />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.75rem',
              fontSize: '1rem',
              color: '#7aa2f7'
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '2px solid rgba(122, 162, 247, 0.2)',
                background: 'rgba(15, 20, 33, 0.8)',
                color: '#a9b1d6',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(122, 162, 247, 0.4)';
                e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.9)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(122, 162, 247, 0.2)';
                e.target.style.backgroundColor = 'rgba(15, 20, 33, 0.8)';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: isLoading
                ? 'linear-gradient(135deg, #565f89 0%, #4a5568 100%)'
                : 'linear-gradient(135deg, #7aa2f7 0%, #b4f9f8 100%)',
              color: '#0f0f23',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: 'none',
              fontWeight: '600',
              fontSize: '1.125rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: isLoading ? 'none' : '0 4px 20px rgba(122, 162, 247, 0.3)',
              transition: 'all 0.2s ease',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/login" style={{
            color: '#7aa2f7',
            textDecoration: 'none',
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            display: 'inline-block'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.1)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}>
            Already have an account? <strong>Sign in →</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: '#0f1419',
      color: '#a9b1d6'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ fontSize: '8rem', marginBottom: '2rem', opacity: '0.5' }}>🔍</div>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#7aa2f7', marginBottom: '1rem' }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
        <p style={{ color: '#9aa5ce', marginBottom: '2rem', lineHeight: '1.6' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" style={{
          backgroundColor: '#7aa2f7',
          color: '#1a1b26',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: '600',
          display: 'inline-block',
          transition: 'all 0.2s ease'
        }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div style={{
      padding: '6rem 2rem 4rem',
      maxWidth: '1400px',
      margin: '0 auto',
      color: '#a9b1d6',
      position: 'relative'
    }}>
      <div style={{ marginBottom: '3rem' }}>
        <Link to="/" style={{
          color: '#7aa2f7',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          transition: 'all 0.2s ease'
        }} onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.1)';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          color: '#7aa2f7',
          marginBottom: '1rem'
        }}>
          Intelligence Dashboard
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#9aa5ce',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Monitor your crypto portfolio, view risk assessments, and track security intelligence
        </p>
      </div>

      {/* Dashboard Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {[
          { title: 'Monitored Addresses', value: '12', change: '+3 this week', icon: '📊' },
          { title: 'Risk Alerts', value: '3', change: '-2 this week', icon: '🚨' },
          { title: 'Saved Reports', value: '8', change: '+1 this week', icon: '📋' },
          { title: 'Analysis Time', value: '< 2s', change: 'avg response', icon: '⚡' }
        ].map((stat, index) => (
          <div key={index} style={{
            background: 'rgba(30, 33, 40, 0.8)',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid rgba(122, 162, 247, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#7aa2f7', marginBottom: '0.5rem' }}>
              {stat.value}
            </div>
            <div style={{ color: '#9aa5ce', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              {stat.title}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: stat.change.includes('+') ? '#48bb78' : stat.change.includes('-') ? '#f56565' : '#9aa5ce'
            }}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'rgba(30, 33, 40, 0.7)',
        borderRadius: '20px',
        padding: '3rem',
        border: '1px solid rgba(122, 162, 247, 0.1)'
      }}>
        <h2 style={{
          color: '#7aa2f7',
          fontSize: '2rem',
          marginBottom: '2rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Quick Actions
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <Link to="/search" style={{
            background: 'rgba(122, 162, 247, 0.08)',
            color: '#7aa2f7',
            padding: '1.5rem',
            borderRadius: '12px',
            textDecoration: 'none',
            border: '2px solid rgba(122, 162, 247, 0.2)',
            textAlign: 'center',
            transition: 'all 0.2s ease',
            display: 'block'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(122, 162, 247, 0.4)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(122, 162, 247, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(122, 162, 247, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#7aa2f7', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Search Address</h3>
            <p style={{ color: '#9aa5ce', lineHeight: '1.5' }}>
              Analyze a new cryptocurrency address for security risks
            </p>
          </Link>

          <div style={{
            background: 'rgba(122, 162, 247, 0.08)',
            color: '#7aa2f7',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '2px solid rgba(122, 162, 247, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ color: '#7aa2f7', marginBottom: '0.5rem', fontSize: '1.25rem' }}>View Reports</h3>
            <p style={{ color: '#9aa5ce', lineHeight: '1.5' }}>
              Access detailed risk reports and analysis history
            </p>
          </div>

          <div style={{
            background: 'rgba(122, 162, 247, 0.08)',
            color: '#7aa2f7',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '2px solid rgba(122, 162, 247, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ color: '#7aa2f7', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Analytics</h3>
            <p style={{ color: '#9aa5ce', lineHeight: '1.5' }}>
              View portfolio analytics and security insights
            </p>
          </div>

          <div style={{
            background: 'rgba(122, 162, 247, 0.08)',
            color: '#7aa2f7',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '2px solid rgba(122, 162, 247, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚙️</div>
            <h3 style={{ color: '#7aa2f7', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Settings</h3>
            <p style={{ color: '#9aa5ce', lineHeight: '1.5' }}>
              Configure your account and notification preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
