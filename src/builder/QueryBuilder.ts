import { Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;

  public query: Record<string, any>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, any>) {
    this.modelQuery = modelQuery;

    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.search;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: "i",
          },
        })),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeFields = ["search", "page", "limit", "sort"];

    excludeFields.forEach((field) => delete queryObj[field]);

    this.modelQuery = this.modelQuery.find(queryObj);

    return this;
  }

  sort() {
    const sort = this.query.sort?.split(",").join(" ") || "-createdAt";

    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;

    const limit = Number(this.query.limit) || 10;

    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
}

export default QueryBuilder;
