import fs from 'fs/promises'
import path from 'path'
import { glob } from 'glob'

const cssDirectory = path.join(process.cwd(), '.next/static/css/app')

async function calculateTotalSize(directory) {
  const files = await glob(`${directory}/**/*.css`)
  let totalSize = 0

  for (const file of files) {
    const stats = await fs.stat(file)
    totalSize += stats.size
  }

  return totalSize
}

;(async () => {
  try {
    const totalSize = await calculateTotalSize(cssDirectory)
    console.log(`Total CSS Size: ${(totalSize / 1024).toFixed(2)} KB`)
  } catch (error) {
    console.error('Error calculating CSS size:', error)
  }
})()
