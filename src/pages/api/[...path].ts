import httpProxy from 'http-proxy'
import { NextApiRequest, NextApiResponse } from 'next/types'

const proxy = httpProxy.createProxyServer()
export const config = {
  api: {
    bodyParser: false
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Don't send cookies to Api server
  req.headers.cookie = ''

  proxy.web(req, res, {
    target: process.env.API_URL,
    changeOrigin: true,
    selfHandleResponse: false
  })
}
