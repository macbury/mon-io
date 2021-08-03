import Hashes from 'jshashes'
import base64 from 'base-64'

function nextTick() : Promise<null> {
  return new Promise((resolve) => setImmediate(resolve))
}

export type TProofOfWorkOptions = {
  jwtToken: string;
  username: string;
  password: string;
}

export type TProofOfWorkResult = {
  hash: string
  jwtToken: string
  counter: number
}

function getTokenOptions(jwtToken) {
  const {
    nonce,
    difficulty,
  } = JSON.parse(base64.decode(jwtToken.split('.')[1]))

  return {
    nonce: nonce || '',
    difficulty: difficulty || '0',
  }
}

/**
 * Generate hash proof of work from payload.
 * Based on idea from https://www.fastly.com/blog/defend-against-credential-stuffing-attacks-proof-of-work
 */
export default async function generateProofOfWork({ jwtToken, username, password } : TProofOfWorkOptions) : Promise<TProofOfWorkResult> {
  const SHA512 = new Hashes.SHA512()
  const {
    nonce, difficulty
  } = getTokenOptions(jwtToken)

  let counter = 0

  while (true) {
    const input = `${nonce}-${username}-${password}-${counter}`
    const hash = SHA512.hex(input)

    if (hash.startsWith(difficulty)) {
      return {
        hash,
        jwtToken,
        counter
      }
    } else {
      counter++;
      await nextTick()
    }
  }
}