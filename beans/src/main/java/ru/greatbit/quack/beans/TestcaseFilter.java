package ru.greatbit.quack.beans;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public class TestcaseFilter extends Filter {

    public TestcaseFilter(Filter filter) {
        super();
        this.excludedFields = filter.excludedFields;
        this.fields = filter.fields;
        this.includedFields = filter.includedFields;
        this.notFields = filter.notFields;
        this.limit = filter.limit;
        this.order = filter.order;
        this.skip = filter.skip;
        this.sortField = filter.sortField;
    }

    private Set<String> groups = new LinkedHashSet<>();
    private List<Attribute> filters = new ArrayList<>();

    public Set<String> getGroups() {
        return groups;
    }

    public List<Attribute> getFilters() {
        return filters;
    }
}
