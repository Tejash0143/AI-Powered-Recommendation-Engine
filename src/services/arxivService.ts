
import { ArxivResponse, Paper, Author } from "../types";

// Base URL for arXiv API
const ARXIV_API_URL = "https://export.arxiv.org/api/query";

/**
 * Fetch papers from arXiv based on search query
 * @param query Search query
 * @param maxResults Maximum number of results to return
 * @param start Start index for pagination
 * @returns Promise with papers data
 */
export const fetchArxivPapers = async (
  query: string,
  maxResults: number = 25,
  start: number = 0
): Promise<Paper[]> => {
  try {
    // Build the query URL with search parameters
    // Using search_query to search in all fields including title, authors, abstracts, etc.
    const searchQuery = encodeURIComponent(query || "cat:cs.CV");
    const url = `${ARXIV_API_URL}?search_query=${searchQuery}&start=${start}&max_results=${maxResults}&sortBy=submittedDate&sortOrder=descending`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching arXiv data: ${response.statusText}`);
    }
    
    // Parse response as text first since arXiv returns XML
    const xmlText = await response.text();
    
    // Convert XML to JSON using DOMParser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    
    // Extract entries from XML
    const entries = Array.from(xmlDoc.getElementsByTagName("entry"));
    
    // Map entries to our Paper format
    const papers: Paper[] = entries.map((entry, index) => {
      // Extract author information
      const authorElements = entry.getElementsByTagName("author");
      const authors: Author[] = Array.from(authorElements).map((author, authorIndex) => {
        const nameElement = author.getElementsByTagName("name")[0];
        return {
          id: `author-${index}-${authorIndex}`,
          name: nameElement?.textContent || "Unknown Author"
        };
      });

      // Extract links
      const links = Array.from(entry.getElementsByTagName("link"));
      const pdfLink = links.find(link => 
        link.getAttribute("title") === "pdf" || 
        link.getAttribute("type") === "application/pdf"
      )?.getAttribute("href") || "";
      
      // Extract categories
      const categories = Array.from(entry.getElementsByTagName("category"));
      const tags = categories.map(category => category.getAttribute("term") || "").filter(Boolean);
      
      // Extract primary category
      const primaryCategory = entry.getElementsByTagName("primary_category")[0]?.getAttribute("term") || tags[0] || "";
      
      // Get the arXiv ID from the id field (last part after the last /)
      const idText = entry.getElementsByTagName("id")[0]?.textContent || "";
      const arxivId = idText.split("/").pop() || `arxiv-${index}`;
      
      // Create paper object
      return {
        id: `arxiv-${arxivId}`,
        arxivId: arxivId,
        title: entry.getElementsByTagName("title")[0]?.textContent?.replace(/\\n/g, " ").trim() || "Untitled Paper",
        abstract: entry.getElementsByTagName("summary")[0]?.textContent?.replace(/\\n/g, " ").trim() || "No abstract available",
        authors: authors,
        publishDate: entry.getElementsByTagName("published")[0]?.textContent || new Date().toISOString(),
        journal: "arXiv",
        citations: 0, // arXiv doesn't provide citation data
        tags: tags,
        url: entry.getElementsByTagName("id")[0]?.textContent || "",
        pdfUrl: pdfLink,
        primaryCategory: primaryCategory,
        // Generate a placeholder image based on category
        imageUrl: `https://images.unsplash.com/photo-${(index % 5) + 1}?auto=format&fit=crop&w=500&h=300`
      };
    });
    
    return papers;
  } catch (error) {
    console.error("Error fetching arXiv papers:", error);
    throw error;
  }
};
