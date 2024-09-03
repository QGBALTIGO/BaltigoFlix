export default function MenuSmartAdaptado() {
	const btnMenu = document.getElementById("menuBtn");
	const barras = document.getElementsByClassName("bars");
	const menu = document.getElementById("menu");
	const menuFundo = document.getElementById("fundoMenu");
	let interruptor = true;
	
	// Abrir e fechar menu em dispositivo móvel
	btnMenu.addEventListener("click", (event) => {
		menuFundo.classList.toggle("w3-show");
		menu.classList.toggle("responsivo");
		btnMenu.classList.toggle("change");
		
		for (let i = 0; i < barras.length; i++) {
			barras[i].classList.toggle("w3-ios-background");
			barras[i].classList.toggle("w3-ios-red");
		}
	});
	
	// Fechar o menu clicando no fundo da página
	menuFundo.addEventListener("click", () => {
		menuFundo.classList.remove("w3-show");
		menu.classList.remove("responsivo");
		btnMenu.classList.remove("change");
		
		for (let i = 0; i < barras.length; i++) {
			barras[i].classList.remove("w3-ios-pink");
			barras[i].classList.add("w3-ios-background");
		}
	});
}