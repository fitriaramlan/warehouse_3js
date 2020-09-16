<?php
class TeoremaBayes {
 
	private $cacar;
	private $bintik2Cacar;
	private $bintik2TidakCacar;
	 
	public function __construct($cacar, $bintik2Cacar, $bintik2TidakCacar) {
	 $this->cacar = $cacar;
	 $this->bintik2Cacar = $bintik2Cacar;
	 $this->bintik2TidakCacar = $bintik2TidakCacar;
	}
	 
	public function setCacar($probCacar) {
	 $this->cacar = $probCacar;
	 }
	 
	public function getCacar() {
	 return $this->cacar;
	}
	 
	public function setBintik2Cacar($probBintik2Cacar) {
	 $this->bintik2Cacar = $probBintik2Cacar;
	 }
	 
	public function getBintik2Cacar() {
	 return $this->bintik2Cacar;
	}
	 
	public function setBintik2TidakCacar($probBintik2TidakCacar) {
	 $this->bintik2TidakCacar = $probBintik2TidakCacar;
	 }
	 
	public function getBintik2TidakCacar() {
	 return $this->bintik2TidakCacar;
	}
	 
	//menghitung probabilitas tidak terkena cacar
	public function notCacar() {
	 return $notCacar = 1 - $this->getCacar();
	}
	 
	//menghitung prob. bintik2cacar kali prob. cacar
	 public function hitungBintik2Cacar() {
	 return $this->getBintik2Cacar() * $this->getCacar();
	 }
	 
	//menghitung prob. bintik2 tidak cacar kali prob. tidak cacar
	public function hitungBintik2TidakCacar() {
	 return $this->getBintik2TidakCacar() * $this->notCacar();
	}
	 
	//menghitung prob. terkena cacar
	public function terkenaCacar() {
	 return round($this->hitungBintik2Cacar() / ($this->hitungBintik2Cacar() + $this->hitungBintik2TidakCacar()), 2);
	 }
	 
	//menghitung prob. tidak terkena cacar
	 public function tidakTerkenaCacar() {
	 return round($this->hitungBintik2TidakCacar() / ($this->hitungBintik2TidakCacar() + $this->hitungBintik2Cacar()), 2);
	}
 
}
 
?>