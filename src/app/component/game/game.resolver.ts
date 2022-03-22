import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { forkJoin } from "rxjs";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { DataService } from "../../service/data.service";

@Injectable()
export class GameResolver implements Resolve<any> {

    constructor(private dataService: DataService) { }

    resolve(): Observable<any> {
        return forkJoin([
            this.dataService.getConfig(),
            this.dataService.getMatch(),
            this.dataService.getTimestamps()
        ]).pipe(
            map(
                res => {
                    return {
                        status:'success',
                        config: res[0].response === 200 ? res[0]!.data : null,
                        match: res[1].response === 200 ? res[1]!.data.match : null,
                        timestamps: res[2].response === 200 ? res[2]!.data : null,
                        sortedTimestamp: res[2].response === 200 ? Object.keys(res[2]!.data).sort() : null,
                    }
                }
            ),
            catchError(err => {
                console.log('caught error',err);
                return of({status:'error',message:'Error retrieving config files'})
            }
        ))
    }
}