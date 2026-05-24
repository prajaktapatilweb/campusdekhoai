import { useState } from "react";

export function useMarathi() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = async (text: string) => {
    // Get the very last word being typed
    const words = text.split(" ");
    const lastWord = words[words.length - 1];

    if (!lastWord.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      // Google Input Tools API for Marathi (mr-t-i0-und)
      const res = await fetch(
        `https://inputtools.google.com/request?text=${encodeURIComponent(lastWord)}&itc=mr-t-i0-und&num=4`,
      );
      const data = await res.json();
      if (data[0] === "SUCCESS") {
        setSuggestions(data[1][0][1]);
      }
    } catch (err) {
      console.error("Transliteration error:", err);
    }
  };

  return { suggestions, fetchSuggestions, setSuggestions };
}
