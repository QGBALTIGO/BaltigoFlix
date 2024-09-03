export default function Accordion() {
	const accordionBtn = document.getElementsByClassName("accordionButton");
	const accordionContainers = document.getElementsByClassName("accordionContainer");
	
	function abrirFecharAccordion(elementoFilho) {
		const accordionFilho = elementoFilho;
		
		if (accordionFilho.className.indexOf("w3-show") == -1) {
		
			for (let i = 0; i < accordionContainers.length; i++) {
				accordionContainers[i].classList.remove("w3-show");
			}
			
			accordionFilho.classList.add("w3-show");
		} else {
			accordionFilho.classList.remove("w3-show");
		}
	}
		
	for (let i = 0; i < accordionBtn.length; i++) {
		accordionBtn[i].addEventListener("click", (event) => {
			abrirFecharAccordion(event.target.nextElementSibling);
		})
	}
}