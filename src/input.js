import "./input.css";

const input = ({ findPastTense, localStorage }) => {
	const handlePaste = (e) => {
		// cancel paste
		e.preventDefault();

		// get text representation of clipboard
		var text = (e.originalEvent || e).clipboardData.getData("text/plain");

		// insert text manually
		document.execCommand("insertHTML", false, text);
	};

	const onKeyDown = (e) => {
		if (e.which === 9) {
			e.preventDefault();
			document.execCommand("insertHTML", false, "&emsp;&emsp;&emsp;");
		}
	};

	return (
		<p
			id="input"
			contentEditable="true"
			placeholder="Type or paste (Ctrl+V) your text here."
			onInput={(e) => findPastTense(e.currentTarget.textContent)}
			onKeyDown={onKeyDown}
			onPaste={handlePaste}
		>
			{localStorage}
		</p>
	);
};

export default input;
