import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';

import Site from '@modules/sites/infra/typeorm/schemas/Site';

@Entity('pages')
class Pages {
  @ObjectIdColumn()
  id: ObjectID;

  @Index({ fulltext: true })
  @Column()
  title: string;

  @Index({ fulltext: true })
  @Column()
  description: string;

  @Index({ fulltext: true })
  @Column('array')
  keywords: string[];

  @Index({ fulltext: true })
  @Column()
  url: string;

  @ObjectIdColumn()
  siteID: ObjectID;

  @ManyToOne(() => Site, site => site.id)
  @JoinColumn({ name: 'siteID' })
  site: Site;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pages;
