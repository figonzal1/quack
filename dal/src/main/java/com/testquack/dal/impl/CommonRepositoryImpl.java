package com.testquack.dal.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import com.testquack.beans.Entity;
import com.testquack.beans.Filter;
import com.testquack.beans.Order;
import com.testquack.dal.CommonRepository;

import java.util.*;

public abstract class CommonRepositoryImpl<E extends Entity> implements CommonRepository<E> {

    @Autowired
    MongoOperations mongoOperations;

    public abstract Class<E> getEntityClass();

    @Override
    public List<E> find(String projectId, Filter filter) {
        return mongoOperations.find(DBUtils.getQuery(filter),
                getEntityClass(),
                getCollectionName(projectId));

    }

    @Override
    public long count(String projectId, Filter filter) {
        return mongoOperations.count(DBUtils.getQuery(filter),
                getEntityClass(),
                getCollectionName(projectId));

    }

    @Override
    public E save(String projectId, E entity) {
        mongoOperations.save(entity, getCollectionName(projectId));
        return entity;
    }

    @Override
    public void delete(String projectId, String entityId) {
        E entity = findOne(projectId, entityId);
        entity.setDeleted(true);
        mongoOperations.save(entity, getCollectionName(projectId));
    }

    public static String getCollectionName(String projectId, Class clazz) {
        return projectId + "_" + clazz.getSimpleName();
    }

    protected String getCollectionName(String projectId){
        return getCollectionName(projectId, getEntityClass());
    }

    @Override
    public E findOne(String projectId, String id) {
        return mongoOperations.findOne(new Query(Criteria.where("id").is(id)), getEntityClass(), getCollectionName(projectId));
    }

    @Override
    public Collection<E> save(String projectId, Collection<E> entities) {
        entities.forEach(element -> mongoOperations.save(element, getCollectionName(projectId)));
        return entities;
    }

    @Override
    public boolean exists(String projectId, String id) {
        return mongoOperations.exists(new Query(Criteria.where("id").is(id)), getEntityClass(), getCollectionName(projectId));
    }
}