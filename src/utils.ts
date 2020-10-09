import { extname } from 'path'
import { getExtension } from 'mime/lite'
import type { Page } from 'puppeteer'

/**
 * @see https://github.com/puppeteer/puppeteer/issues/305#issuecomment-385145048
 */
export const autoScroll = async (page: Page): Promise<void> => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0
      const distance = 100
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight
        scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
  })
}

export const getFilepath = ({
  directory,
  pathname,
  mimeType,
}: {
  directory: string
  pathname: string
  mimeType: string
}): string => {
  const hasExtension = extname(pathname) !== ''
  return hasExtension
    ? `${directory}${pathname}`
    : `${directory}${pathname}.${getExtension(mimeType)}`
}

export const isValidURL = (value: string): boolean => {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}
