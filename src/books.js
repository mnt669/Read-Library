import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./img/Book.svg";
import Searchform from "./searchform";
import Footer from "./footer";
import Book from "./book";
import LoadingCard from "./loadingCard";

// Helper function to pick random genres or authors
const getRandomSearchTerm = () => {
  const searchTerms = [
    "fiction", "mystery", "science fiction", "romance", "history", 
    "comedy", "adventure", "self-help", "thriller", "non-fiction", 
    "J.K. Rowling", "George Orwell", "Jane Austen", "Mark Twain", "Agatha Christie"
  ];
  return searchTerms[Math.floor(Math.random() * searchTerms.length)];
};

const BookDetails = () => {
  const [details, setDetails] = useState([]);
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0); // Track the start index for pagination

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);  // Reset error state before new request

      try {
        // If term is empty, fetch random books
        const query = term || getRandomSearchTerm();
        const resources = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=11`
        );
        setDetails(resources.data.items);
        setStartIndex(11);  // Set the start index for the next load more request
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [term]);  // Fetch whenever 'term' changes

  const loadMore = async () => {
    setIsLoading(true);
    try {
      // Fetch more books based on current search term or random term if empty
      const query = term || getRandomSearchTerm();
      const resources = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=8&startIndex=${startIndex}`
      );
      setDetails((oldDetails) => [...oldDetails, ...resources.data.items]);
      setStartIndex(startIndex + 8);  // Update the start index for the next load more request
    } catch (error) {
      console.error("Error fetching more books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="book-title">Discover, Dream, and Dive Into Your Next Book!</h2>
      <Searchform searchText={setTerm} /> {/* Update the search term with the Searchform */}

      {isLoading ? (
        <section className="container loading-section">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : error ? (
        <h1 className="error-message">
          😞 {error}
        </h1>
      ) : (
        <section>
          <section className="container" style={{ padding: "2rem 0rem" }}>
            {details.map((book, index) => (
              <Book {...book} key={index} />
            ))}
            <div className="custom-card">
              <h3 className="custom-card-text">Didn't find the book you love?</h3>
              <img className="custom-card-img" src={logo} alt="A man reading a book" />
              <h3 className="custom-card-text">
                Search for your favourite{" "}
                <span className="highlight-text">Genre</span> or{" "}
                <span className="highlight-text">Author</span> in the search box!!
              </h3>
            </div>
          </section>

          <div className="load-more">
            <button className="load-more-button" onClick={loadMore}>Load More!</button>
          </div>

          <Footer />
        </section>
      )}
    </>
  );
};

export default BookDetails;
