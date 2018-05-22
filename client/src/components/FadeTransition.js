// Dependencies
import React from 'react'
import { Transition } from 'react-transition-group'

function FadeTransition ({children, duration, in: inProp}) {
  const defaultStyle = {
    transition: `${duration}ms ease-in`,
    transitionProperty: 'opacity, transform'
  }

  let transitionStyles = {}

  if (children.props.children.props.item.clickAcceptButton === true) {
    transitionStyles = {
      entering: {
        opacity: 0,
        transform: 'translateX(-200%)'
      },
      entered: {
        opacity: 1,
        transform: 'translateX(0)'
      },
      exiting: {
        opacity: 0,
        transform: 'translateX(200%)'
      }
    }
  }

  if (children.props.children.props.item.clickRejectButton === true) {
    transitionStyles = {
      entering: {
        opacity: 0,
        transform: 'translateX(200%)'
      },
      entered: {
        opacity: 1,
        transform: 'translateX(0)'
      },
      exiting: {
        opacity: 0,
        transform: 'translateX(-200%)'
      }
    }
  }

  return (
    <Transition in={inProp} timeout={{
      enter: 0,
      exit: duration
    }}>
      {
        (state) => {
          if (state === 'exited') {
            return null
          }

          return React.cloneElement(children, {
            style: Object.assign({}, defaultStyle, transitionStyles[state])
          })
        }
      }
    </Transition>
  )
}

export default FadeTransition
