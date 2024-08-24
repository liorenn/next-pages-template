import { Affix, Button, Transition } from '@mantine/core'

import { IconArrowUp } from '@tabler/icons-react'
import { useIsMobile } from '@/hooks/common'
import { useWindowScroll } from '@mantine/hooks'

export default function ScrollToTop() {
  const isMobile = useIsMobile()
  const [scroll, scrollTo] = useWindowScroll()

  return (
    <>
      {!isMobile && (
        <Affix position={{ bottom: 70, right: 10 }}>
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
      )}
    </>
  )
}
