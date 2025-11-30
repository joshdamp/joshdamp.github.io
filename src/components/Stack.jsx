import { motion, useMotionValue, useTransform } from 'motion/react'
import { useState, memo, useCallback, useMemo } from 'react'
import './Stack.css'

const CardRotate = memo(({ children, onSendToBack, sensitivity }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [60, -60])
  const rotateY = useTransform(x, [-100, 100], [-60, 60])

  const handleDragEnd = useCallback((_, info) => {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack()
    } else {
      x.set(0)
      y.set(0)
    }
  }, [onSendToBack, sensitivity, x, y])

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  )
})
CardRotate.displayName = 'CardRotate'

function Stack({
  randomRotation = true,
  sensitivity = 180,
  cardDimensions = { width: 280, height: 280 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = true,
  onCardClick = null
}) {
  const [cards, setCards] = useState(() => cardsData.length ? cardsData : [])

  const sendToBack = useCallback((id) => {
    setCards(prev => {
      const index = prev.findIndex(card => card.id === id)
      if (index === -1) return prev
      const newCards = [...prev]
      const [card] = newCards.splice(index, 1)
      newCards.unshift(card)
      return newCards
    })
  }, [])

  const containerStyle = useMemo(() => ({
    width: cardDimensions.width,
    height: cardDimensions.height,
    perspective: 600
  }), [cardDimensions.width, cardDimensions.height])

  const transition = useMemo(() => ({
    type: 'spring',
    stiffness: animationConfig.stiffness,
    damping: animationConfig.damping
  }), [animationConfig.stiffness, animationConfig.damping])

  return (
    <div className="stack-container" style={containerStyle}>
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0

        return (
          <CardRotate 
            key={card.id} 
            onSendToBack={() => sendToBack(card.id)} 
            sensitivity={sensitivity}
          >
            <motion.div
              className="card"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={transition}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height
              }}
            >
              <img 
                src={card.img} 
                alt={`card-${card.id}`} 
                className="card-image" 
                loading="lazy"
              />
              {card.title && (
                <div className="card-overlay">
                  <h3 className="card-title">{card.title}</h3>
                  {card.description && (
                    <p className="card-description">{card.description}</p>
                  )}
                  {card.tags && (
                    <div className="card-tags">
                      {card.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  {onCardClick && (
                    <button
                      className="card-view-details-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCardClick(card.id);
                      }}
                    >
                      View Details
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </CardRotate>
        )
      })}
    </div>
  )
}

export default memo(Stack)
