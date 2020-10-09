import { promises as fs } from 'fs'
import { dirname } from 'path'
import { launch } from 'puppeteer'
import { autoScroll, getFilepath } from './utils'

export const run = async (url: string): Promise<void> => {
  const browser = await launch({ handleSIGTERM: false })
  const [page] = await browser.pages()
  const { host: directory, pathname: documentPath } = new URL(url)

  try {
    await fs.access(directory)
    await fs.rmdir(directory, { recursive: true })
  } catch {
    // noop
  } finally {
    await fs.mkdir(directory)
  }

  page.on('response', async (res) => {
    const { pathname } = new URL(res.url())
    const mimeType = res.headers()['content-type']

    if (!pathname.startsWith('/')) return

    const filepath = getFilepath({
      directory,
      pathname: pathname === documentPath ? '/index.html' : pathname,
      mimeType,
    })

    try {
      const buffer = await res.buffer()
      await fs.mkdir(`${directory}${dirname(pathname)}`, { recursive: true })
      await fs.writeFile(filepath, buffer)
      console.log(filepath)
    } catch {
      // noop
    }
  })

  await page.goto(url)
  await autoScroll(page)

  await page.close()
  await browser.close()
  console.log('✨ Done!')
}
