package br.com.erudio.services;

import br.com.erudio.model.Person;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.logging.Logger;

@Service
public class PersonService {

    private final AtomicLong counter = new AtomicLong();
    private Logger logger = Logger.getLogger(PersonService.class.getName());

    public Person findById(String id) {
        return new Person();
    }

    public List<Person> findAll() {
        List<Person> persons = new ArrayList<>();
        return persons;
    }

    public Person create(Person person) {
        Person person1 = new Person();
        person1.setId(person.getId());
        person1.setAdress(person.getAdress());
        person1.setFirstName(person.getFirstName());
        person1.setLastName(person.getLastName());
        person1.setGender(person.getGender());
        return person1;
    }
}
