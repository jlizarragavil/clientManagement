package com.clientManagement.springboot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="clients")
public class Client implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable=false)
	@NotEmpty(message= "Must not be empty")
	@Size(min=3, max = 12, message="Length must be between 3 and 12 characters")
	private String name;
	
	@NotEmpty(message= "Must not be empty")
	private String lastName;
	
	@Column(nullable=false, unique=true)
	@NotEmpty(message= "Must not be empty")
	@Email(message= "Error in email format")
	private String email;
	@NotNull(message = "Date can´t be null")
	@Column(name="created_at")
	@Temporal(TemporalType.DATE)
	private Date createdAt;
	
	/*@PrePersist
	public void prePersist() {
		createdAt = new Date();
	}*/
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
