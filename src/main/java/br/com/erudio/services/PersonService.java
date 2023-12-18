package br.com.erudio.services;

import br.com.erudio.data.vo.v1.PersonVO;
import br.com.erudio.data.vo.v2.PersonVOV2;
import br.com.erudio.exceptions.ResourceNotFoundException;
import br.com.erudio.mapper.DozerMapper;
import br.com.erudio.mapper.custom.PersonMapper;
import br.com.erudio.model.Person;
import br.com.erudio.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class PersonService {

    private Logger logger = Logger.getLogger(PersonService.class.getName());

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PersonMapper personMapper;

    public List<PersonVO> findAll() {
        return DozerMapper.parseListObjects(personRepository.findAll(), PersonVO.class);
    }

    public PersonVO findById(Long id) {
        var entity = personRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No records found for this ID"));

        return DozerMapper.parseObject(entity, PersonVO.class);
    }

    public PersonVO create(PersonVO personVO) {
        var entity = DozerMapper.parseObject(personVO, Person.class);

        var vo = DozerMapper.parseObject(personRepository.save(entity), PersonVO.class);

        return vo;
    }

    public PersonVOV2 createV2(PersonVOV2 personVOV2) {
        var entity = personMapper.convertVoToEntity(personVOV2);

        var vo = personMapper.convertEntityToVo(personRepository.save(entity));

        return vo;
    }

    public PersonVO update(PersonVO personVO) {
        Person entity = personRepository.findById(personVO.getId()).orElseThrow(() -> new ResourceNotFoundException("No records found for this ID"));

        entity.setAddress(personVO.getAddress());
        entity.setGender(personVO.getGender());
        entity.setFirstName(personVO.getFirstName());
        entity.setLastName(personVO.getLastName());

        var vo = DozerMapper.parseObject(personRepository.save(entity), PersonVO.class);

        return vo;
    }

    public void delete(Long id) {
        Person entity = personRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No records found for this ID"));
        personRepository.delete(entity);
    }

}
