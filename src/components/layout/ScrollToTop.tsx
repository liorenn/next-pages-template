import { Affix, Button, Transition } from '@mantine/core'
import { useOs, useWindowScroll } from '@mantine/hooks'

import { IconArrowUp } from '@tabler/icons-react'

export default function ScrollToTop() {
  const os = useOs()
  const [scroll, scrollTo] = useWindowScroll()

  return (
    <>
      {os !== 'ios' ? (
        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition='slide-up' mounted={scroll.y > 100}>
            {(transitionStyles) => (
              <Button
                variant='light'
                color='gray'
                leftSection={<IconArrowUp size={16} />}
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}>
                Scroll To Top
              </Button>
            )}
          </Transition>
        </Affix>
      ) : (
        ''
      )}
    </>
  )
}
