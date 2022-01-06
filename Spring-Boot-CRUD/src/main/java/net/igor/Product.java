package net.igor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {
	private Integer id;
	private String name;
	private float price;
	private int quantity_in_stock;
	private String category;
	private String provider;
	
	public Product() {
		
	}
	
	public Product(Integer id, String name, float price, int quantity_in_stock, String category, String provider) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.quantity_in_stock = quantity_in_stock;
		this.category = category;
		this.provider = provider;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public float getPrice() {
		return price;
	}
	
	public void setPrice(float price) {
		this.price = price;
	}
	
	public int getQuantity_in_stock() {
		return quantity_in_stock;
	}
	
	public void setQuantity_in_stock(int quantity_in_stock) {
		this.quantity_in_stock = quantity_in_stock;
	}
	
	public String getCategory() {
		return category;
	}
	
	public void setCategory(String category) {
		this.category = category;
	}
	
	public String getProvider() {
		return provider;
	}
	
	public void setProvider(String provider) {
		this.provider = provider;
	}
}