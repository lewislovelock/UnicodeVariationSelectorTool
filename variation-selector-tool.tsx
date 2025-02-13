"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Share2, Copy, AlertTriangle } from "lucide-react"

export default function VariationSelectorTool() {
  const [baseChar, setBaseChar] = useState("😊")
  const [message, setMessage] = useState("")
  const [encodedMessage, setEncodedMessage] = useState("")
  const [decodedMessage, setDecodedMessage] = useState("")
  const [activeTab, setActiveTab] = useState("encode")
  const { toast } = useToast()

  useEffect(() => {
    const savedEncodedMessage = localStorage.getItem("encodedMessage")
    if (savedEncodedMessage) {
      setEncodedMessage(savedEncodedMessage)
    }
  }, [])

  const encode = (base: string, message: string): string => {
    const encoded = message
      .split("")
      .map((char) => {
        const byte = char.charCodeAt(0)
        return String.fromCodePoint(byte < 16 ? 0xfe00 + byte : 0xe0100 + (byte - 16))
      })
      .join("")
    return base + encoded
  }

  const decode = (encoded: string): string => {
    const bytes = Array.from(encoded)
      .slice(1)
      .map((char) => {
        const code = char.codePointAt(0)!
        if (code >= 0xfe00 && code <= 0xfe0f) {
          return code - 0xfe00
        } else if (code >= 0xe0100 && code <= 0xe01ef) {
          return code - 0xe0100 + 16
        }
        return -1
      })
      .filter((byte) => byte !== -1)
    return String.fromCharCode(...bytes)
  }

  const handleEncode = () => {
    if (baseChar && message) {
      const encoded = encode(baseChar, message)
      setEncodedMessage(encoded)
      localStorage.setItem("encodedMessage", encoded)
      toast({
        title: "Message Encoded!",
        description: "Your secret message has been hidden.",
      })
    }
  }

  const handleDecode = () => {
    if (encodedMessage) {
      const decoded = decode(encodedMessage)
      setDecodedMessage(decoded)
      setMessage(decoded) // Update message state for consistency
      toast({
        title: "Message Decoded!",
        description: "The hidden message has been revealed.",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "You can now paste it anywhere.",
      })
    })
  }

  const shareEncodedMessage = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Hidden Message",
          text: encodedMessage,
          url: window.location.href,
        })
        .then(() => {
          toast({
            title: "Shared successfully!",
            description: "Your encoded message has been shared.",
          })
        })
        .catch(console.error)
    } else {
      copyToClipboard(encodedMessage)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Secret Emoji Encoder
      </h1>
      <p className="text-center text-muted-foreground">Hide your messages in plain sight using Unicode magic!</p>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This tool is for educational purposes only. Do not use it to bypass content moderation or for any malicious
          purposes.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>
        <TabsContent value="encode" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="baseChar">Choose an Emoji</Label>
            <Input
              id="baseChar"
              value={baseChar}
              onChange={(e) => setBaseChar(e.target.value)}
              placeholder="Enter an emoji"
              maxLength={2}
              className="text-small"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Secret Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your secret message here"
              rows={3}
            />
          </div>
          <Button onClick={handleEncode} className="w-full">
            Encode Message
          </Button>
          {encodedMessage && (
            <div className="space-y-2">
              <Label>Encoded Message</Label>
              <div className="flex items-center space-x-2">
                <Input value={encodedMessage} readOnly className="flex-grow" />
                <Button size="icon" variant="outline" onClick={() => copyToClipboard(encodedMessage)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={shareEncodedMessage}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="decode" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="encodedMessage">Paste Encoded Message</Label>
            <Input
              id="encodedMessage"
              value={encodedMessage}
              onChange={(e) => setEncodedMessage(e.target.value)}
              placeholder="Paste the encoded message here"
              className="text-small"
            />
          </div>
          <Button onClick={handleDecode} className="w-full">
            Decode Message
          </Button>
          {decodedMessage && (
            <div className="space-y-2">
              <Label>Decoded Message</Label>
              <Textarea value={decodedMessage} readOnly rows={3} />
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="outline" onClick={() => copyToClipboard(decodedMessage)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={() => shareEncodedMessage()}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <footer className="text-center text-sm text-muted-foreground">
        <p>Created with ❤️ by v0. Inspired by Unicode magic.</p>
        <p>Share this tool with your friends and see who can crack your secret messages!</p>
      </footer>

      <Toaster />
    </div>
  )
}

