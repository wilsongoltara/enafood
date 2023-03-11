import { Model, model, models, Schema } from 'mongoose';

export class AbstractODM<T> {
  protected schema: Schema;
  protected model: Model<T>;

  constructor(modelName: string, schema: Schema) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, schema);
  }

  public async insert(body: object): Promise<T> {
    const inserted = await this.model.create({ ...body });
    return inserted;
  }

  public async getAll(): Promise<T[]> {
    const list = await this.model.find();
    return list;
  }

  public async getById(id: string): Promise<T | null> {
    const result = await this.model.findById(id);
    return result;
  }

  public async updateById(id: string, body: object): Promise<T | null> {
    const updated = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
    return updated;
  }
}
