import { useEffect } from "react";
import "./App.css";
import Input from "./input";
import $ from "jquery";

function App() {
	const pos = require("pos");

	const findPastTense = (text) => {
		$("#all-suggestions").html("");

		localStorage.setItem("input", text);

		$("#underline").html($("#input").html());

		// remove non-alphabetic characters;
		text = text.replace(/[^a-zA-Z\s]/g, "");

		// tokenizes input text into array of words;
		const words = new pos.Lexer().lex(text);
		const tagger = new pos.Tagger();
		tagger.tag(words);

		// set to store past tense words;
		let pastTenseWords = [];

		words.forEach((word) => {
			// tag each word if it is present, past, etc...
			let tag = tagger.tag([word])[0];

			// check if the word is in past tense;
			if (tag[1] === "VBD" || tag[1] === "VBN") {
				let el = $("#underline");
				// search for past tense word in <p>;
				let regex = new RegExp(tag[0], "g");
				el.html(el.html().replace(regex, `<span class="underline">${tag[0]}</span>`));

				$("#all-suggestions").append(
					// ! create seperate component
					`<div class="suggestion"><div class="circle"/><span class="issue">PAST TENSE</span><span class="word">${word}</span><span class="desc">This word is in past tense. <b>Consider</b> changing it.</span></div>`
				);

				// add past tense word to array;
				pastTenseWords.push(tag[0]);
			}
		});

		$("#amt").html(pastTenseWords.length);

		// returns set of past tense words;
		return pastTenseWords;
	};

	const newTitle = (e) => {
		localStorage.setItem("title", e.currentTarget.textContent);
	};

	let localTitle = localStorage.getItem("title") || "";
	let localInput = localStorage.getItem("input") || "";

	useEffect(() => {
		findPastTense(localInput);
	}, []);

	return (
		<div>
			<p id="title" placeholder="Untitled Document" contentEditable="true" onInput={newTitle}>
				{localTitle}
			</p>
			<p id="underline"></p>
			<Input findPastTense={findPastTense} localStorage={localInput} />
			<div id="amt"></div>
			<p id="suggestions">Past Tense</p>
			<div id="all-suggestions"></div>
		</div>
	);
}

export default App;
