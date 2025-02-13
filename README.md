
# Secret Emoji Encoder

## Overview

Secret Emoji Encoder is a fun and educational web application that allows users to hide secret messages within emojis using Unicode variation selectors. This project demonstrates the creative use of Unicode characters and serves as an interesting example of steganography in text.

![Secret Emoji Encoder Screenshot](/public/screenshoot.png)

## Features

- Encode secret messages within emojis
- Decode hidden messages from encoded emojis
- User-friendly interface with separate tabs for encoding and decoding
- Copy encoded/decoded messages to clipboard
- Share encoded messages (uses Web Share API if available)
- Responsive design suitable for both desktop and mobile devices
- Local storage to remember the last encoded message

## Technology Stack

- React
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/lewislovelock/UnicodeVariationSelectorTool.git
   cd secret-emoji-encoder
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Encoding a Message**:
   - Select the "Encode" tab
   - Choose an emoji or use the default one
   - Enter your secret message
   - Click "Encode Message"
   - Copy or share the encoded message

2. **Decoding a Message**:
   - Select the "Decode" tab
   - Paste the encoded message (including the emoji)
   - Click "Decode Message"
   - View the decoded secret message

## How It Works

The Secret Emoji Encoder uses Unicode variation selectors to hide text within emojis. Each character of the secret message is converted into a variation selector, which is then appended to the chosen emoji. This process is reversible, allowing the original message to be extracted from the encoded emoji.

## Limitations and Considerations

- The encoded messages may not display correctly on all platforms or devices.
- This tool is for educational purposes only and should not be used for secure communication.
- Be cautious when sharing encoded messages, as they may trigger spam filters or be flagged by content moderation systems.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the work of Andrey Karpathy and Paul Butler on Unicode steganography
- Thanks to the creators and maintainers of React, Next.js, and shadcn/ui
