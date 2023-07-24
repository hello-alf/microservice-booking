import { v4 as uuidv4 } from 'uuid';
import { iBusinessRule } from './iBusinessRule';
import { DomainEvent } from './domainEvent';
import { BusinessRuleValidationException } from './bussinessRuleValidationException';

export abstract class Entity {
  public id: string;
  public readonly domainEvents: DomainEvent[];

  protected constructor() {
    this.id = uuidv4();
    this.domainEvents = [];
  }

  public addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public clearDomainEvents(): void {
    this.domainEvents.length = 0;
  }

  protected checkRule(rule: iBusinessRule): void {
    if (!rule) throw new Error('Rule cannot be null');

    if (!rule.isValid()) throw new BusinessRuleValidationException(rule);
  }

  public getId(): string {
    return this.id;
  }

  public getDomainEvents(): DomainEvent[] {
    return [...this.domainEvents];
  }
}
