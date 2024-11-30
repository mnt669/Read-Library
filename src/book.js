import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import defaultBook from "./img/defaultBook.png";
import "../src/sass/style.css";
import { motion } from "framer-motion";

const Book = ({ id, volumeInfo }) => {
  const imageVariants = {
    hover: {
      scale: 1.7,
      boxShadow: "0px 0px 8px #000",
      transition: {
        duration: 0.5,
        type: "spring",
        delay: 0.15,
      },
    },
  };
  let { title, authors, publisher, previewLink, imageLinks } = volumeInfo;

  // Setting up default values for volume info data
  title = title || "Title is not available";
  authors = authors || "Author(s) name not available";
  publisher = publisher || "Publisher company not available";
  previewLink = previewLink || "https://books.google.co.in/";

  return (
    <section key={id} className="book-card">
      <div className="book-card-container">
        <motion.img
          src={imageLinks ? imageLinks.thumbnail : defaultBook}
          width="100px"
          alt="Book-cover"
          variants={imageVariants}
          whileHover="hover"
          className="book-cover-img"
        />
        
        <div className="book-info">
          {title && <h3 className="book-title">{title}</h3>}
          
          {authors && (
            <h4 className="book-author">
              Author: <span className="author-name">{authors}</span>
            </h4>
          )}

          {publisher && (
            <h5 className="book-publisher">
              Published by: <span className="publisher-name">{publisher}</span>
            </h5>
          )}

          {previewLink && (
            <h5 className="book-preview-link">
              Read more: 
              <a href={previewLink} target="_blank" rel="noreferrer" className="preview-link">
                Google Books <BiLinkExternal />
              </a>
            </h5>
          )}
        </div>
      </div>
    </section>
  );
};

export default Book;
