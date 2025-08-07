'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Users, Shield, BarChart3, Smartphone, Globe, Zap, CheckCircle, 
  ArrowRight, Mail, Phone, MapPin, Clock, Star, Database, Code,
  Monitor, Server, FileText, Calendar, MessageSquare, Settings,
  Building, Briefcase, Rocket, Heart, Sparkles, Menu, X, Lock
} from 'lucide-react'

// Particle System Component
const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const particles: any[] = []
    const particleCount = 100
    
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.2
      }
      
      update() {
        this.x += this.vx
        this.y += this.vy
        
        if (canvas) {
          if (this.x < 0 || this.x > canvas.width) this.vx *= -1
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1
        }
      }
      
      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`
        ctx.fill()
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
    
    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true })
  
  useEffect(() => {
    if (inView) {
      const startTime = Date.now()
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000
        const progress = Math.min(elapsed / duration, 1)
        const currentCount = Math.floor(value * progress)
        
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }
  }, [inView, value, duration])
  
  return (
    <span ref={ref} className="text-4xl font-bold text-white">
      {count}{suffix}
    </span>
  )
}

// 3D Card Component
const Card3D = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    
    setRotation({ x: rotateX, y: rotateY })
  }
  
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }
  
  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 200])
  
  // Handle contact actions
  const handleContact = (type: 'email' | 'phone') => {
    if (type === 'email') {
      window.location.href = 'mailto:support@driftpro.no'
    } else if (type === 'phone') {
      window.location.href = 'tel:45045451'
    }
  }
  
  const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: true })
  const [ref5, inView5] = useInView({ threshold: 0.1, triggerOnce: true })

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'contact']
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    // Smooth scroll function
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash && target.hostname === window.location.hostname) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    }
    
    // Add smooth scroll listeners
    document.addEventListener('click', handleSmoothScroll)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const stats = [
    { icon: Users, value: 13, label: 'Hovedsider', description: 'Komplett funksjonalitet' },
    { icon: Database, value: 15, label: 'Database Collections', description: 'Skalerbar arkitektur' },
    { icon: Code, value: 75000, label: 'Kodelinjer', description: 'Profesjonell utvikling' },
    { icon: Zap, value: 35, label: 'API Endepunkter', description: 'Kraftig backend' },
    { icon: Shield, value: 7, label: 'HMS Underfaner', description: 'Omfattende HMS-system' },
    { icon: FileText, value: 12, label: 'Moduler', description: 'Komplette funksjoner' },
    { icon: Smartphone, value: 2, label: 'Mobil Apps', description: 'iOS & Android' },
    { icon: Globe, value: 3, label: 'Plattformer', description: 'Web, iOS, Android' },
  ]

  const features = [
    {
      icon: Shield,
      title: 'HMS-system',
      description: 'Komplett Helse, Miljø og Sikkerhet med 7 underfaner og avansert rapportering',
      details: ['Avviksbehandling', 'Risikostyring', 'Sikkerhet', 'Miljø', 'Kompetanse', 'Sjekklister', 'Rapportering'],
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Personaladministrasjon',
      description: 'Omfattende ansattstyring med rollebasert tilgang og avansert søk',
      details: ['Ansattoversikt', 'Avdelinger', 'Roller', 'E-postvarsling', 'Statistikk', 'Søk & Filtrering'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Avansert Rapportering',
      description: 'Real-time statistikk og omfattende analyser',
      details: ['Live Dashboard', 'PDF Eksport', 'Planlagte Rapporter', 'KPI-sporing'],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Smartphone,
      title: 'Mobil Apps',
      description: 'iOS og Android apps med full funksjonalitet',
      details: ['Native Performance', 'Offline Støtte', 'Push Varsler', 'Biometrisk Login'],
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      icon: Globe,
      title: 'Web Admin Panel',
      description: 'Responsivt web-dashboard for desktop og tablet',
      details: ['Moderne UI/UX', 'Real-time Data', 'Responsivt Design', 'Tilgangskontroll'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Zap,
      title: 'Real-time Kommunikasjon',
      description: 'Chat-system og e-postvarsling',
      details: ['Intern Chat', 'E-postvarsler', 'Push Notifications', 'Fil-deling'],
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Calendar,
      title: 'Vaktplanlegging',
      description: 'Avansert vaktplanlegging og tidsregistrering',
      details: ['Vaktplanlegging', 'Tidsregistrering', 'Overtidsberegning', 'Stempel-system'],
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: FileText,
      title: 'Dokumenthåndtering',
      description: 'Sikker filhåndtering og versjonskontroll',
      details: ['Fil-opplasting', 'Versjonskontroll', 'Søk og filtrering', 'Sikker lagring'],
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Building,
      title: 'Samarbeidspartnere',
      description: 'Partneradministrasjon og oppdragstyring',
      details: ['Partneroversikt', 'Oppdragstyring', 'E-postvarsling', 'PDF-eksport'],
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: MessageSquare,
      title: 'Intern Kommunikasjon',
      description: 'Chat-system og meldingshåndtering',
      details: ['Intern Chat', 'Gruppemeldinger', 'Fil-deling', 'Push Notifications'],
      gradient: 'from-rose-500 to-pink-500'
    },
    {
      icon: Settings,
      title: 'Systemadministrasjon',
      description: 'Omfattende systemkonfigurasjon og sikkerhet',
      details: ['Brukeradministrasjon', 'Rollebasert tilgang', 'Sikkerhetsinnstillinger', 'Backup'],
      gradient: 'from-slate-500 to-gray-500'
    },
    {
      icon: Database,
      title: 'Multi-bedrift Støtte',
      description: 'Støtte for flere bedrifter og organisasjoner',
      details: ['Bedriftsadministrasjon', 'Isolerte data', 'Hierarkisk struktur', 'Skalerbarhet'],
      gradient: 'from-emerald-500 to-green-500'
    }
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ParticleSystem />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-shrink-0">
                <img src="/logo.svg" alt="DriftPro" className="h-14 w-auto" />
              </div>
            </motion.div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {['features', 'contact'].map((section) => (
                  <motion.a
                    key={section}
                    href={`#${section}`}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeSection === section 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.a>
                ))}
                <motion.a 
                  href="https://admin.driftpro.no" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Lock size={16} />
                  Login
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Kontakt Oss
                </motion.a>
              </div>
            </div>

            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                {['features', 'contact'].map((section) => (
                  <a 
                    key={section}
                    href={`#${section}`} 
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                ))}
                <a 
                  href="https://admin.driftpro.no" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white block text-center px-3 py-2 rounded-md text-base font-medium flex items-center justify-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Lock size={16} />
                  Login
                </a>
                <a 
                  href="#contact" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white block text-center px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kontakt Oss
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-16 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-transparent"></div>
        <div className="absolute inset-0" style={{ 
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%'
        }}></div>
        
        <motion.div 
          style={{ y }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-7xl md:text-9xl font-black mb-6 text-white tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              DriftPro
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed"
          >
            Komplett bedriftsadministrasjonsplattform med HMS, personaladministrasjon, 
            rapportering og mobil-apps for iOS og Android
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mb-12 text-blue-200 text-sm"
          >
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              HMS-system med 7 underfaner
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              13 komplette moduler
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Multi-platform støtte
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Real-time data
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Rollebasert tilgang
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              GDPR-kompatibel
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a 
              href="#features" 
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Se Funksjoner
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
            
            <motion.a 
              href="#features" 
              className="group px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center">
                <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                Se Funksjoner
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 text-blue-400 opacity-30"
        >
          <Code className="w-8 h-8" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-20 text-purple-400 opacity-30"
        >
          <Database className="w-8 h-8" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-40 left-20 text-pink-400 opacity-30"
        >
          <Shield className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <Card3D className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                  <motion.div 
                    className="flex justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-12 h-12 text-blue-600" />
                  </motion.div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.value >= 1000 ? '+' : ''} />
                  </div>
                  <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.description}</div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={ref1} className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-50"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView1 ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                13 Kraftige Funksjoner
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              DriftPro kombinerer avansert teknologi med intuitivt design for å gi deg 
              den ultimate bedriftsadministrasjonsløsningen med omfattende funksjonalitet
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card3D className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className={`p-3 bg-gradient-to-r ${feature.gradient} rounded-xl mr-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-center text-sm text-gray-600"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView1 ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={ref5} className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView5 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView5 ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Kom i Gang
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Kontakt oss for å lære mer om DriftPro og hvordan vi kan hjelpe 
              din bedrift med digital transformasjon
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView5 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold mb-8">Kontaktinformasjon</h3>
              <div className="space-y-6">
                <motion.button 
                  className="flex items-center group w-full text-left"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleContact('email')}
                >
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-blue-100 text-lg">support@driftpro.no</span>
                </motion.button>
                
                <motion.button 
                  className="flex items-center group w-full text-left"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleContact('phone')}
                >
                  <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-4">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-blue-100 text-lg">450 45 451</span>
                </motion.button>
                
                <motion.div 
                  className="flex items-center group"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-blue-100 text-lg">Oslo, Norge</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center group"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-4">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-blue-100 text-lg">Man-Fre: 09:00-17:00</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView5 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="text-3xl font-bold mb-8">Avanserte Funksjoner</h3>
              <div className="space-y-6">
                <motion.div 
                  className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-xl font-semibold mb-4 text-blue-100">Multi-Platform Støtte</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-blue-200">
                    <div className="flex items-center">
                      <Monitor className="w-4 h-4 mr-2" />
                      Web Admin Panel
                    </div>
                    <div className="flex items-center">
                      <Smartphone className="w-4 h-4 mr-2" />
                      iOS App
                    </div>
                    <div className="flex items-center">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Android App
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Responsivt Design
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-xl font-semibold mb-4 text-blue-100">Sikkerhet & Compliance</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-blue-200">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Rollebasert tilgang
                    </div>
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Kryptert data
                    </div>
                    <div className="flex items-center">
                      <Database className="w-4 h-4 mr-2" />
                      GDPR-kompatibel
                    </div>
                    <div className="flex items-center">
                      <Code className="w-4 h-4 mr-2" />
                      API-sikkerhet
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-xl font-semibold mb-4 text-blue-100">Teknisk Spesifikasjon</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-blue-200">
                    <div className="flex items-center">
                      <Code className="w-4 h-4 mr-2" />
                      Next.js 15.4.4
                    </div>
                    <div className="flex items-center">
                      <Database className="w-4 h-4 mr-2" />
                      Firebase
                    </div>
                    <div className="flex items-center">
                      <Smartphone className="w-4 h-4 mr-2" />
                      React Native
                    </div>
                    <div className="flex items-center">
                      <Server className="w-4 h-4 mr-2" />
                      TypeScript
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                      <div className="grid md:grid-cols-3 gap-8">
                        <div>
              <img src="/logo.svg" alt="DriftPro" className="h-10 w-auto mb-4" />
              <p className="text-gray-400 leading-relaxed">
                Komplett bedriftsadministrasjonsplattform for moderne bedrifter
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:support@driftpro.no" className="hover:text-white transition-colors duration-300">E-post Support</a></li>
                <li><a href="tel:45045451" className="hover:text-white transition-colors duration-300">Telefon</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Dokumentasjon</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Selskap</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Om Oss</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Karriere</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Presse</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Kontakt</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DriftPro. Alle rettigheter forbeholdt.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 