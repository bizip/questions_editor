import React, { useState } from 'react';

const Question = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [showAlternatives, setShowAlternatives] = useState(false);

  const handleClick = (word) => {
    setSelectedWord(word);
    setShowAlternatives(!showAlternatives);
  };

  const words = [
    { word: 'React', alternatives: ['Vue', 'Angular', 'Ember'] },
    { word: 'JavaScript', alternatives: ['TypeScript', 'CoffeeScript', 'Elm'] },
    { word: 'State', alternatives: ['Props', 'Context', 'Redux'] },
  ];

  return (
    <div className="question">
      {words.map((wordData, index) => {
        const { word, alternatives } = wordData;
        return (
          <div key={index} className="word">
            <span onClick={() => handleClick(word)} className={selectedWord === word ? 'active' : ''}>
              {selectedWord === word ? alternatives[0] : word}
            </span>
            {selectedWord === word && showAlternatives && (
              <ul className="alternatives">
                {alternatives.map((alt, i) => (
                  <li key={i} onClick={() => handleClick(alt)}>
                    {alt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Question;
