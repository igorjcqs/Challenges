package net.igor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository rep;

	public List<Product> index() {
		return rep.findAll();
	}
	
	public void save(Product product) {
		rep.save(product);
	}
	
	public Product get(Integer id) {
		return rep.findById(id).get();
	}
	
	public void delete(Integer id) {
		rep.deleteById(id);
	}
	
}