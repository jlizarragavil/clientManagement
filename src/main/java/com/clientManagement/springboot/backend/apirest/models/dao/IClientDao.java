package com.clientManagement.springboot.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.clientManagement.springboot.backend.apirest.models.entity.Client;

public interface IClientDao extends CrudRepository<Client, Long>{
	
}
