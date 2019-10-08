import { Test, TestingModule } from '@nestjs/testing';
import { CustController } from './cust.controller';
import { CustService } from './cust.service';

describe('CustController', () => {
  let custController: CustController;
  let custService: CustService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustController],
      providers: [CustService]
    }).compile();

    custService = app.get<CustService>(CustService);
    custController = app.get<CustController>(CustController);
    
  });

  describe('root', () => {
    it('should return ', () => {
      expect(custController.register('','',{
  "first_cust": "string",
  "last_cust": "string",
  "email": "string12346@gmail.com",
  "password": "string",
  "role": "user",
  "created_date_time": new Date()
})).toBe('Node API Template');
    });
  });
});
